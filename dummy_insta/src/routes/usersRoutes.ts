import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { verify } from "../middleware/middleware";
import dotenv from "dotenv";

import { login , getUserbyQuery,createUsers,updateUser,deleteUsers, getUserbyidusingToken, getuserbyid, getallusers } from "../controllers/usersControllers";
const userRouter = new Router();
userRouter.prefix('/users');
dotenv.config();

userRouter.post('/login',bodyParser(),login);
userRouter.get('/user',verify, getUserbyidusingToken);
userRouter.post('/getall' , bodyParser(),verify,getallusers)
userRouter.get('/:id' , verify, getuserbyid)
userRouter.get('/', verify, getUserbyQuery);
userRouter.post('/' ,bodyParser(), createUsers);
userRouter.put('/', bodyParser(),verify, updateUser) // validation not applied on this
userRouter.delete('/' ,verify, deleteUsers);
export default userRouter;