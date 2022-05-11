import { Context } from "koa";
import { userData } from "../constants/data";
import { Notfound ,myError } from "../error/error";
import  jwt  from "jsonwebtoken";
import { Iuser } from "../constants/interfaces";
import { v4 } from "uuid";
import { createUsersService, deleteUsersServices, getallusersServices, getUserbyidServices, getUserbyQueryServices, loginService, updateUserServices } from "../services/userServices";


export const login = (ctx:Context)=>{
    
    try {
        const body = ctx.request.body;
        const token = loginService(body);
        ctx.status = 200;
        ctx.body = {token}
    } catch (error:any) {
        ctx.status = error.statuscode;
        ctx.body  = error.message;
    }
}
export const createUsers = (ctx: Context) => {
    try {

        const user = ctx.request.body;

        const id = createUsersService(user);
     
        ctx.status = 201;
        // const token = jwt.sign({ id: id }, "secret-key")
        ctx.body = { id };
     

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }

}

export const getUserbyidusingToken = (ctx: Context) => {
    try {
        const id = ctx.state.playload.id;
        const filtered = getUserbyidServices(id);
        ctx.status = 200;
        ctx.body = filtered;

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const getuserbyid = (ctx:Context)=>{
    try {
        const id = ctx.params.id;
        const filtered = getUserbyidServices(id);
        ctx.status = 200;
        ctx.body = filtered;

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const getUserbyQuery = (ctx: Context) => {
    try {
        const { name = '' } = ctx.request.query;
        const filtered =  getUserbyQueryServices(name);
        ctx.status = 200;
        ctx.body = filtered;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const updateUser = (ctx: Context) => {
    try {
        const body = ctx.request.body;
        const id = ctx.state.playload.id;
        updateUserServices(id, body);
        ctx.status = 201;
        ctx.body = id;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const deleteUsers = (ctx: Context) => {
    try {
        const id = ctx.state.playload.id;
        deleteUsersServices(id);
        ctx.status = 201;
        ctx.body = id;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}
export const getallusers = (ctx:Context)=> {
    
    try {
        const body = ctx.request.body;
        // const body  = {reviews :['1','2'], books:['3']}
        const allusers = getallusersServices(body.reviews, body.books);
        ctx.status = 200;
        ctx.body = allusers;
    } catch (error:any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }

}