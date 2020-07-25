const spawn = require('child_process').spawn;

const process = spawn("python", ['./b.py']);

console.log("from A.js");
process.stdout.on("data",  data => {
   console.log(data.toString());
});
console.log("from A.js");