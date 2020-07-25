// var Person = require('./person');

// const  person1 = new Person('swetanshu',22);

// person1.greetings();


// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('message', (data) => console.log(`Called Listner:`,  data));
// logger.log('Hello World');


///////////////////////////////////////////////////////////////
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    //console.log(req.url);
    console.log(req.method);
    // if(req.url=== '/'){
    //     // res.writeHead(200, { 'Content-Type': 'text/html'}); 
    //     // res.end('<h1> Home <h1>');
    //     fs.readFile(
    //         path.join(__dirname,'public','index.html'), 
    //         (err, content) => {
    //             if(err) throw err;
    //             res.writeHead(200, {"Content-Type": "text/html"});
    //             res.end(content);
    //         }
    //     )
    // }
    // if(req.url=== '/api/users'){
    //     const users =[
    //         {name:'abc', age:22},
    //         {name:'def', age:44}
    //     ]
    //     res.writeHead(200, {"Content-Type": "application/json"});
    //             res.end(JSON.stringify(users));
    // // }
     let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url+'.html');

     //Extention of file
     let extname = path.extname(filepath);

     //intitial content type
     let contentType = 'text/html';

     switch (extname){
         case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case 'png':
            contentType = 'image/png';
            break;
     }

     //Read File
     fs.readFile(filepath, (err,content) => {
         if(err){
             if(err.code == 'ENOENT'){
                 //page not found
                 fs.readFile(path.join(__dirname,'public', '404.html'), (err,content)=> {
                     res.writeHead(200, {"Content-Type":"text/html"});
                    res.end(content,'utf8');
                 })
                }else {
                    //some server error
                    res.writeHead(500);
                    res.end(`server error: ${err.code}`);
                }
         }else{
             //Success
             res.writeHead(200, {"Content-Type": contentType});
             res.end(content,'utf8');
         }
     })
});

// const PORT = 5000;
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log(`server running on port: ${PORT}`));
