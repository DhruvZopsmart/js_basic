const http = require('http');
require('dotenv').config();

const port = process.env.PORT ;
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log(typeof(req.method));

    // console.log(req);
   
     if(req.method == 'GET' &&  req.url =='/method'){
        // console.log('get');
        fs.readFile('index.html', 'utf8' , (err, data)=>{
            if(err){
                res.statusCode(500);
                res.setHeader('Content-Type' , 'text/html')
                res.end('<h1> Internal server error</h1>')
            }
            
            else {
                res.statusCode= 200;
                res.setHeader('Content-Type','text/html');
                res.end(data);
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
