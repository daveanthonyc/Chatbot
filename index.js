import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
    const lines = ctx.message.text.split('\n');
    const firstLine = lines[0];

    if (firstLine.includes("Wednesday Service Attendance") && firstLine.includes("💒") && ctx.message.text.includes('/calculate')) {
        // parse O1
        const o1 = transformRawLine(lines[4]);
        const o2 = transformRawLine(lines[5]);
        const o3 = transformRawLine(lines[6]);

        const totaledArrays = sumArrays(o1,o2,o3);

        // add in brackets to finalied array
        const finalArray = insertBrackets(totaledArrays);
        const totalPeopleInDep = finalArray[0];
        const totalAbsentee = finalArray[finalArray.length-1];
        const totalAttendees = totalPeopleInDep - totalAbsentee;
        const attendancePercentage = Math.floor(totalPeopleInDep / totalAttendees * 100);
        const finalTotal = finalArray.join('/');
        const addedStrig = `\nTotal: ${finalTotal}\n\nParticipation rate: ${totalPeopleInDep}/${totalAttendees} - ${attendancePercentage}%`

        // join at specific points
        await ctx.reply(lines.slice(0,7).concat(addedStrig).join('\n'));

    }   // Using context shortcut
})

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

// 0 1 234 5 6789 10

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
