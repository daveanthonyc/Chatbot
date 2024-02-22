import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import dotenv, { parse } from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log("this has started");

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
    const lines = ctx.message.text.split('\n');
    const firstLine = lines[0];

    if (firstLine.includes("Wednesday Service Attendance") && firstLine.includes("💒") && ctx.message.text.includes('/add')) {
        try {
            // parse O1
            const o1 = transformRawLine(lines[4]);
            const o2 = transformRawLine(lines[5]);
            const o3 = transformRawLine(lines[6]);

            // uncertain if index position reflects correct values: group total / offline + online attendance
            const groups = [
                { name: "O1", total: o1[0], attendees: (Number(o1[1]) + Number(o1[5]) + Number(o1[10]))},
                { name: "O2", total: o2[0], attendees: (Number(o2[1]) + Number(o2[5]) + Number(o2[10]))},
                { name: "O3", total: o3[0], attendees: (Number(o3[1]) + Number(o3[5]) + Number(o3[10]))},
            ]

            const totaledArrays = sumArrays(o1,o2,o3);

            // add in brackets to finalied array
            const finalArray = insertBrackets(totaledArrays);
            const totalPeopleInDep = finalArray[0];
            const totalAbsentee = finalArray[finalArray.length-1];
            const totalAttendees = totalPeopleInDep - totalAbsentee;
            const attendancePercentage = Math.round(totalAttendees * 100 / totalPeopleInDep);
            const finalTotal = finalArray.join('/');
            const addedStrig = `\nTotal: ${finalTotal}\n\nParticipation rate: ${totalAttendees}/${totalPeopleInDep} - ${attendancePercentage}%`

            // join at specific points

            let errorFlag = false;

            groups.forEach((group) => {
                if (Number(group.total) !== Number(group.attendees)) {
                    errorFlag = true;
                    ctx.reply(`⚠️ ${group.name} has a calculation error. Their group total is ${group.total} but their attendees and TBC add up to ${group.attendees}. ⚠️`);
                }
            })

            if (!errorFlag) {
                await ctx.reply(lines.slice(0,7).concat(addedStrig).join('\n'));
            }
        } catch (error) {
            await ctx.reply('The form might not have all the proper numbers and forward slashes. Please review.');
        }
    }   // Using context shortcut

    if ( firstLine.includes("✨ Wednesday Service") && ctx.message.text.includes('/report') ) {
        try {
            const finalStr = parseWedAttendance(ctx.message.text);
            ctx.reply(finalStr);
        } catch(err) {
            ctx.reply("There was an error")
        }
    }

    if (firstLine.includes('📌  "Examination of Heaven"') && ctx.message.text.includes('/calc'))  {
        try {
            const finalStr = heavenlyExamParser(ctx.message.text);
            ctx.reply(finalStr);
        } catch (err) {
            ctx.reply("There was an error")
        }
    }
})


export function parseWedAttendance(str) {
    const splitLines = str.split('\n');

    const firstLine = splitLines[0];
    if (!firstLine.includes('✨ Wednesday Service')) {
        throw new Error("This is not a Wednesday Service Form");
    }

    const arr = [];
    let count = 0;
    const SECOND_LINE = 3;

    for (let i = SECOND_LINE; i < splitLines.length; i++) {

        if (splitLines[i].includes("OFFLINE") || splitLines[i].includes("ONLINE")) {
            count = 0;
            continue;
        }

        const EMPTY_STRING = (splitLines[i].length === 0);
        if (!EMPTY_STRING) {
            count++;
        } else {
            arr.push(count);
        }
    }

    const finalStr = transformWedArrayToReportFormat(arr);
    return finalStr;
}

export function heavenlyExamParser(str) {
    const counts = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0,
        G: 0,
    } 

    const splitLines = str.split('\n');
    const tbcPeople = [];

    for (let i = 8 ; i < splitLines.length; i++) {
        const separate = splitLines[i].split('/');

        const IS_NOT_MEMBER = (separate.length < 2);
        if (IS_NOT_MEMBER || !separate[2]) {
            continue;
        }

        const examLevel = separate[2].trimStart()[0];

        if (examLevel in counts) {
            counts[examLevel]++;
        } else {
            tbcPeople.push(separate[1]);
        }
    }

    const DEPARTMENT_TOTAL = 53;
    const finalStr = `SD ${DEPARTMENT_TOTAL}/${counts.A}/${counts.B}/${counts.C}/${counts.D}/${counts.E}/${counts.F}/${counts.G}/${tbcPeople.length} (TBC: ${tbcPeople.join(', ')})

The breakdown:
SD Total: ${DEPARTMENT_TOTAL}
Cat A: ${counts.A}
Cat B: ${counts.B}
Cat C: ${counts.C}
Cat D: ${counts.D}
Cat E: ${counts.E}
Cat F: ${counts.F}
Cat G: ${counts.G}
TBC: ${tbcPeople.length}
`;

    return finalStr;
}

function transformWedArrayToReportFormat(arr) {
    const GROUP_TOTAL = 20;
    const sevenOFFLINE = arr[0];
    const sevenONLINE = arr[1];
    const twelveOFFLINE = arr[2];
    const twelveONLINE = arr[3];
    const sevenPMONLINE = arr[4];
    const tenOFFLINE = arr[5];
    const tenONLINE = arr[6];

    const TOTAL_OFFLINE = sevenOFFLINE + twelveOFFLINE + tenOFFLINE;
    const TOTAL_ONLINE = sevenONLINE + twelveONLINE + sevenPMONLINE + tenONLINE;
    
    const TBC = GROUP_TOTAL - TOTAL_OFFLINE - TOTAL_ONLINE;

    const finalStr = `${GROUP_TOTAL} / ${TOTAL_OFFLINE}(${sevenOFFLINE}/${twelveOFFLINE}/${tenOFFLINE}) / ${TOTAL_ONLINE}(${sevenONLINE}/${twelveONLINE}/${sevenPMONLINE}/${tenONLINE}) / ${TBC} TBC`

    return finalStr;
}

function transformRawLine(str) {
    const values = str.split("-")[1];
    //const numbers = values.split("/");
    const numbersOnly = values.match(/\d+/g);
    return numbersOnly;
}

function sumArrays(arr1, arr2, arr3) {
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
        result.push(Number(arr1[i]) + Number(arr2[i]) + Number(arr3[i]));
    }
    return result;
}

function insertBrackets(inputArray) {
    const p1 = inputArray[0];
    const p2 = inputArray[1].toString() + "(" + inputArray.slice(2,5).join('/') + ")";
    const p3 = inputArray[5].toString() + "(" + inputArray.slice(6,10).join('/') + ")";
    const p4 = inputArray[10];
    return [p1, p2, p3, p4];
}

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
