import http from 'http';
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import url from 'url'
dotenv.config();
import { ITodo, statuses, requestMethods } from './const';
const PORT = process.env.PORT;



// TodoList
let TodoList: ITodo[] = [];

// creating server
const server = http.createServer((req, res) => {
    let requrl = req.url || '';
    // posting TodoList to server
    if (req.method == requestMethods.POST && req.url == '/todo') {
        let body = '';
        req.on('TodoList', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const filteredj = JSON.parse(body);
            try {
                if (filteredj.title === undefined)
                    throw "title not given";
                if (!(filteredj.status === statuses.incomplete || filteredj.status === undefined)) {
                    throw `status should be spellled ${statuses.incomplete}`;
                }
                filteredj.status=statuses.incomplete;
                
                let id = v4();
                const value:ITodo = { id, ...filteredj,createdDate:new Date()  };
                TodoList.push(value);
                res.statusCode = 201;
                res.end(JSON.stringify(value));

            } catch (error) {
                res.statusCode = 406;
                res.end(error);
            }
        })
    }
    // get request for query
    else if (req.method == requestMethods.GET && (requrl).includes('/todo') && requrl.includes('?')) {
        const parse = url.parse(requrl, true);
        let { title='' } = parse.query;
        if (title == '') { res.statusCode = 200; res.end(JSON.stringify(TodoList)); }
        
        title = Array.isArray(title) ? title[0] : title;
        let Todofilteredj:ITodo[] = [];
        if( title ) {
            TodoList.forEach((v) => {
                if(v.title.includes(title.toString())) {
                    Todofilteredj.push(v);
                }
            })
        }
        res.statusCode = 200;
        if (Todofilteredj.length == 0)
            res.end('no result for query ');
        else
            res.end(JSON.stringify(Todofilteredj));
        res.end();
    }
    //get request for id
    else if (req.method == requestMethods.GET && (requrl).includes('/todo')) {
        const arr = requrl.split('/');
        const id = arr[2];

        if (id !== undefined) {
            try {
                const filtered: ITodo | any=  TodoList.filter((v) => {
                    if (v.id == id)
                        return v;
                })
                console.log(filtered.length);
                console.log(filtered);
                if (!filtered.length)
                    throw "todo with this id not present";
                res.end(JSON.stringify(filtered));
            } catch (error) {
                res.statusCode = 400;
                res.end(error);
            }
        }

        else {
            res.statusCode = 400;
            res.end('id not given');
        }
    }
    // delete todo
    else if (req.method == requestMethods.DELETE ) {
        const arr = requrl.split('/');
        const id = arr[2];
        if (id != undefined) {
            let filtered = TodoList.filter((v) => {
                if (v.id != id)
                    return v;
            })
            if (filtered.length == TodoList.length) {
                res.statusCode = 400;
                res.end('id not present')
            }
            TodoList = filtered;
            res.statusCode = 200;
            res.end(`TodoList with id ${id} deleted`)
        }
        else {
            res.statusCode = 400; res.end('id not given');
        }
    }
    // put request
    else if (req.method == requestMethods.PUT && (requrl).includes('/todo')) {
        const arr = requrl.split('/');
        const id = arr[2];
        let body = '';
        if (id != undefined) {
            req.on('TodoList', chunk => {
                body += chunk.toString();
            })
            req.on('end', () => {
                const filtered = JSON.parse(body);
                let value = 0;
                TodoList.map(e => {
                    if (e.id == id) {
                        e.title = filtered.title ? filtered.title : e.title;
                        e.status = filtered.stataus ? filtered.stataus : e.status;
                        e.updatedAt = new Date();
                        value = 1;
                    }
                });
                if (value) {

                    res.statusCode = 201;
                    res.end(JSON.stringify({
                        TodoList: {
                            'id': id
                        }
                    }));
                }
                else {
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
    //url not found
    else {
        res.statusCode = 404;
        res.end('page not found');
    }
})

server.listen(PORT, () => {
    console.log(`server is listening on PORT  ${PORT}`);
})