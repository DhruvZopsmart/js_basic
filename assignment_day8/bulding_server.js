const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3000;
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log(typeof(req.method), req.url);

    // console.log(req);
   
     if(req.method == 'GET' &&  req.url =='/method'){
        // console.log('get');
        fs.readFile('./static/index.html', 'utf8' , (err, data)=>{
            if(err){
                res.statusCode =500;
                res.setHeader('Content-Type' , 'text/html')
                res.write('<h1> Internal server error</h1>')
                res.end();
            }
            
            else {
                res.statusCode= 200;
                res.setHeader('Conte1nt-Type','text/html');
                console.log('html');

                res.end(data);
            }
        })
    }
    else if ("./index.css".includes(req.url)){
        fs.readFile('./static/index.css', 'utf8' , (err, data)=>{
            if(err){
                res.statusCode =500;
                // res.setHeader('Content-Type' , 'text/html')
                res.end('<h1> Internal server error</h1>')
            }
            
            else {
                res.statusCode= 200;
                // res.setHeader('Content-Type','text/html');
                res.write(data);
                console.log('css applied')
                res.end();
            }
        })
    }
    else if(req.method == 'POST' && req.url =='/echo')
    {
        let body='';
        req.on('data' ,chunck =>{
            body +=chunck.toString();
        })
        req.on('end', ()=>{
            res.end(body);
        });
    }
    else {
       res.statusCode = 404;
       res.setHeader('Content-Type','text/html');
       res.end('<h1> 404 error </h1>');
    }
 
    

    
})

server.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
})
