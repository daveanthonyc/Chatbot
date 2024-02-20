import { test, expect } from "vitest";
import { parseWedAttendance } from ".";



test("Wed Parse Form", () => {
    expect(parseWedAttendance(testStr)).toEqual("20 / 8(2/2/4) / 7(2/1/2/2) / 5 TBC");
})

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
