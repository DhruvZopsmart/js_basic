import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { verify } from "../middleware/middleware";
import { getBookbyAuthid, getBookbyQuery,getBookbyid,createBook,updateBook,deleteBook } from "../controllers/bookControllers";

const bookRouter = new Router();
bookRouter.prefix('/book');


bookRouter.get('/auth' ,verify, getBookbyAuthid);
bookRouter.get('/:id', verify, getBookbyid);        
bookRouter.get('/',verify, getBookbyQuery);
// bookRouter.get('/',verify, getBookLimit)
bookRouter.post('/', bodyParser() ,verify, createBook);
bookRouter.put('/:id', bodyParser(), verify, updateBook); // validation not applied on this
bookRouter.delete('/:id',verify, deleteBook);

export default bookRouter;