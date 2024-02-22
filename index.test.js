import { test, expect, expectTypeOf } from "vitest";
import { parseWedAttendance, heavenlyExamParser } from ".";



test("Wed Parse Form", () => {
    expect(parseWedAttendance(testStr)).toEqual("20 / 8(2/2/4) / 7(2/1/2/2) / 5 TBC");
})

test("heavenly exam form", () => {
    expect(heavenlyExamParser(testHeavenlyStr)).toBe("SD 53/19/13/7/2/0/1/8/3 (TBC: John A, Jennifer, Ssong)");
})

const testHeavenlyStr = `📌  "Examination of Heaven"


SD 53/19/13/7/2/0/1/8/3 (TBC: John A, Jennifer, Ssong)
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
G0/Applicant Name/Type of Exam

Please write your chosen exam category next to your name e.g. O1/Apple/F

O1
O1/Christelle/A
💻O1/Irvin/A (overseas)
O1/ Tiana/A
O1/ Marie/A
O1/Newton/A
O1/Claudia/A
O1/Christine/B
O1/Agatha/B
O1/Mirko/B
O1/Ashley/C
O1/ Jimmy S/D
O1/Chris/G
💻O1/Ting Yin/G (overseas)
O1/Jarrel/G
O1/Tommy/G
O1/Akshana/G

O2 
O2/Tumai/A
O2/Nasha/ A
O2/Kiana/ A
O2/Gloria/ A
O2/Leonie/ A
O2/Brandon/ A
O2/David/B
O2/Anne/ B
O2/Evan/ B
O2/Samuel/ B
O2/Tiffany/B
O2/John E/ B
O2/Dave/ C
O2/Eric/C
O2/Jess/ C
O2/Melina/ C
O2/Alex/ D
O2/Lia/ F
O2/Ssong/‼️
O2/John A/‼️

O3 
O3/Bella/A
O3/Kathy/A
O3/Tomu/A
O3/Hannah J/A
O3/Dube/A
O3/Rachel/A
O3/Liann/A
O3/Kim/B
O3/Mario/B
O3/Adrienne/B
O3/Karl/ B
O3/ Jay/B
O3/Jonathan/C
O3/Tuan/ C
O3/Jimmy C/G
O1/Daniel/G
O3/Jennifer/‼️

Total confirmed: 50

/calc
`

const testStr = `✨ Wednesday Service  
OFFLINE @ PARRA CT Room 1  

7:00am OFFLINE 🚘  
- Dave
- Jess

7.00am ONLINE 💻  
- Sam
Nasha 

12 pm OFFLINE 🚘  
Kiana 
John

12 pm ONLINE 💻  
David

7pm ONLINE 💻 
- Evander
- Gloria 

10pm OFFLINE 🚘  
-Anne
-Eric 
- Lia
- Tiff

10pm ONLINE 💻  
Melina
Brandon

🛎 Need to check time:`
