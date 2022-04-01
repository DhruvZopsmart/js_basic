
const http = require('http');
require('dotenv').config();
let todoList= [];
const server = http.createServer((req,res)=>{
    if(req.method == 'GET' && req.url =='/show_todo'){
            res.statusCode = 200;
            res.setHeader('Content-Type' , "application/json");
            res.end(JSON.stringify(todoList));
    }
    else if(req.method == 'POST' && req.url == '/add_todo'){
          let body = ''
           req.on('data' , chunk =>{
               body += chunk.toString();

           })
           req.on('end' , ()=>{
            // console.log(body);
            const value = JSON.parse(body);
            todoList.push(value);
            console.log(todoList);
            res.end('task added successfully');
           })
    }
    else if(req.method == 'DELETE' && req.url == '/delete_todo'){
        let body = '';
        let a = [];
        req.on('data', chunk=>{
            body += chunk.toString();
        })
        req.on('end', ()=>{
            body = JSON.parse(body);
           a= todoList.filter(v=>{ return v.title != body.title})
           todoList=a;
                console.log(todoList);
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'txt/plain')
            res.end('task delted successfuly');
        })
    }
    else if(req.method == 'PATCH' && req.url == '/update_todo'){
        let body = '';
        req.on('data', chunk =>{
            body+=chunk;
        })
        req.on('end' ,()=>{ 
            body = JSON.parse(body);
            todoList.map(v=>{  
                if(v.title == body.title){
                    v.body =  body.body;
                }
            })
            console.log(todoList);
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'txt/plain');
            res.end('task updated succesfully');
        })
    }
    else {
        res.statusCode = 404;

        res.setHeader('Content-Type','txt/html');
        res.end('<h1> bad request </h1>')
    }
})
server.listen(process.env.PORT , ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})