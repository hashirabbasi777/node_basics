// const math = require('./math');

// console.log("Addition", math.add(2,3))
// console.log("Subtraction", math.subtract(5,2))

// console.log("Hello from Node.js");
// console.log("This is a sample index.js file.");


//Learning File system fs


// const fs = require('fs');


// fs.readFile('data.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log("Error reading file:", err);
//         return;
//     } else{
//         console.log("File content:", data);
//     }
// }); 




//Learn asynchrounous programming with callbacks

const { read } = require('fs');
const fs = require('fs/promises');


async function readFileData(){
    try{
        const data = await fs.readFile('data.txt', 'utf-8');
        console.log("File content:", data);
    } catch (err){
        console.log("Error reading file:", err);
    }
}


readFileData();