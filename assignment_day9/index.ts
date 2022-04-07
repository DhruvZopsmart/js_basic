import http from 'http';
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import url from 'url'
dotenv.config();

const PORT = process.env.PORT;

// enums
enum statuses {
    incomplete = 'incomplete',
    inprogress = 'inprogress',
    completed = 'completed'
}

// data
let data: { title?: string, id?: string, status?: statuses, createdDate?: Date, updatedAt?: Date }[] = [];

// creating server
const server = http.createServer((req, res) => {
    let requrl: string = req.url || '';

    if (req.url === undefined) {
        res.statusCode = 404;
        res.end();
    }

    // posting data to server
    if (req.method == 'POST' && req.url == '/todo') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const obj = JSON.parse(body);
            try {
                if (obj.title === undefined)
                    throw "title not given";
                if (!(obj.status === statuses.incomplete || obj.status === undefined)) {
                    throw `status should be spellled ${statuses.incomplete}`;
                }
                obj.status = statuses.incomplete;
                let id = v4();
                const value = { id, title: obj.title, status: obj.status, date: new Date() };
                data.push(value);
                res.statusCode = 201;
                res.end(JSON.stringify(value));

            } catch (error) {
                res.statusCode = 400;
                res.end(error);
            }
        })
    }

    // get request
    else if (req.method == 'GET' && (requrl).includes('/todo')) {
        const arr = requrl.split('/');
        const id = arr[2];

        if (id !== undefined) {
            try {
                const ob = data.map((v) => {
                    if (v.id == id)
                        return v;
                })
            console.log(ob);
                if (ob)
                    throw "todo with this id not present";
                res.end(JSON.stringify(ob));
            } catch (error) {
                res.statusCode = 400;
                res.end(error);
            }
        }

        else if (requrl.includes('?')) {
            const parse = url.parse(requrl, true);
            let { title } = parse.query ;
            if(!title)
            {res.statusCode = 400; res.end('query not given');}
            let matchedobj: any[] = [];
            data.map(v => {
                if (v.title == title) {
                    matchedobj.push(v);
                }
            })
            res.statusCode = 200;
            if (matchedobj.length == 0)
                res.end('no result for query ');
            else
                res.end(JSON.stringify(matchedobj));
            res.end();
        }

        else {
            res.statusCode = 400;
            res.end('id not given');
        }
    }

    // delete todo
    else if (req.method == 'DELETE') {
        const arr = requrl.split('/');
        const id = arr[2];
        if (id != undefined) {
            let filtered = data.filter((v) => {
                if (v.id != id)
                    return v;
            })
            if (filtered.length == data.length) {
                res.statusCode = 400;
                res.end('id not present')
            }
            data = filtered;
            res.statusCode = 200;
            res.end(`data with id ${id} deleted`)
        }
        else {
            res.statusCode = 400; res.end('id not given');
        }
    }

    // put request
    else if (req.method == 'PUT' && (requrl).includes('/todo')) {
        const arr = requrl.split('/');
        const id = arr[2];
        let body = '';
        if (id != undefined) {
            req.on('data', chunk => {
                body += chunk.toString();
            })
            req.on('end', () => {
                const obj = JSON.parse(body);
                let value =0 ;
                data.map(e => {
                    if (e.id == id) {
                        e.title = obj.title ? obj.title : e.title;
                        e.status = obj.stataus ? obj.stataus : e.status;
                        e.updatedAt = new Date();
                        value = 1;
                    }
                });
                if(value){
                    
                res.statusCode = 201;
                res.end(JSON.stringify({
                    data:{
                        'id':id
                    }
                }));
                }
                else{
                    res.statusCode = 400;
                    res.end('id not present');
                }
            })
        }

        else {
            res.statusCode = 400;
            res.end('id not given');
        }
    }
    else {
        res.statusCode=404;
        res.end('page not found');
    }
})

server.listen(PORT, () => {
    console.log(`server is listening on PORT  ${PORT}`);
})