import koa from "koa";
import json from "koa-json"
import router from "koa-router";
import bodyParser from 'koa-bodyparser'
import { v4 } from 'uuid';
import { statuses, ITodo, requestMethods } from "./const";
import { Context } from "vm";
const todoRouter = new router();
const app = new koa();
app.use(json())
todoRouter.prefix('/todo');

let TodoList: ITodo[] = [];

app.context.log = console.log;

app.use( async(ctx,next)=>{
    ctx.log(ctx.url);
   await next();
})

const  deleteTodo = (ctx:Context)=>{
    
        const id = ctx.params.id;

            let filtered = TodoList.filter((v) => {
                if (v.id != id)
                    return v;
            })
            if (filtered.length == TodoList.length) {
                ctx.status = 400;
                ctx.body = 'id not present';
            }
            TodoList = filtered;
            ctx.status = 200;
            ctx.body = `TodoList with id ${id} deleted`;
        
}

const updateTodo =   (ctx:Context) => {
    try {
       const {id} = ctx.params;
       const {title,status} = ctx.request.body;
       if(!title) {
           ctx.status = 406;
           throw "Title is not defined";
       }
       if(status && ![statuses.completed, statuses.incomplete, statuses.inprogress].includes(status)) {
           ctx.status = 406;
           throw "Status is not valid";
       }
       TodoList.forEach((e)=> {
           if(e.id == id){
               e.title = title;
               e.status = status ? status : statuses.incomplete;
               e.updatedAt = new Date()
           }
       });
       ctx.status = 201;
       ctx.body = { TodoList };
    } catch (error) {
        ctx.status = 406;
        ctx.body = error;
    }
}

const createTodo =  (ctx:Context) => {
    ctx.body = 'idk';
    const filteredj = ctx.request.body;
    // console.log(filteredj);
    try {
        if (filteredj.title === undefined)
            throw "title not given";
        if (!(filteredj.status === statuses.incomplete || filteredj.status === undefined)) {
            throw `status should be spellled ${statuses.incomplete}`;
        }
        filteredj.status = statuses.incomplete;

        let id = v4();
        const value: ITodo = { id, ...filteredj, createdDate: new Date() };
        TodoList.push(value);
        ctx.status = 201;
        ctx.body = (JSON.stringify(value));

    } catch (error) {
        ctx.status = 406;
        ctx.body = (error);
    }
}

const queryResult =   (ctx:Context) => {
    const { title = '' } = ctx.request.query;

    const query: string = Array.isArray(title) ? title[0] : title;
    // console.log("d" + query + "d");
    let Todofilteredj: ITodo[] = [];
    TodoList.forEach((v) => {
        if (v.title.includes(query)) {
            Todofilteredj.push(v);
        }
    });
    // console.log(Todofilteredj);
    ctx.status = 200;
    if (Todofilteredj.length == 0) {
        ctx.body = [];
    } else {
        ctx.body = (JSON.stringify(Todofilteredj));
    }
}

const getTodoWithId = (ctx:Context) => {
    const id = ctx.params.id;
    console.log(id);
    try {
        const filtered: ITodo | any = TodoList.filter((v) => {
            if (v.id == id)
                return v;
        })
        // console.log(TodoList);
        // console.log(filtered.length);
        // console.log(filtered);
        if (!filtered.length)
            throw "todo with this id not present";
        ctx.body = JSON.stringify(filtered);
    } catch (error) {
        ctx.status = 400;
        ctx.body = error;
    }


}



todoRouter.get('/:id', getTodoWithId);

todoRouter.get('/', queryResult);

todoRouter.post('/',bodyParser(), createTodo);

todoRouter.put('/:id',bodyParser(), updateTodo );

todoRouter.delete('/:id', deleteTodo);

app.use(todoRouter.routes()).use(todoRouter.allowedMethods({
    notImplemented: () => "Router not found ", methodNotAllowed: () => "Method not found!"
})).listen(3001, () => {
    console.log(`server is running at port ${3001}`);
})