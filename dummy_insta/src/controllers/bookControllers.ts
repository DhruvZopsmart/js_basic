import { bookvalidation } from "../validations/joi";
import { Context } from "koa";
import { Iuser,Ibook,Ireview } from "../constants/interfaces";
import { myError, Notfound } from "../error/error";
import { userData,books } from "../constants/data";
import { v4 } from "uuid";
import { createBookServices, deleteBookServices, getbookbyidServices, getBookbyQueryServices, updateBookServices ,getBookbyAuthidServices } from "../services/booksServices";



export const createBook = (ctx: Context) => {
    try {
        const bookbody = ctx.request.body;
        const userid = ctx.state.playload.id;
        const id = createBookServices(bookbody ,  userid);
        ctx.status = 201;
        ctx.body = { id };
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }

}

export const getBookbyid = (ctx: Context) => {
    try {
        const bookid = ctx.params.id;
        const index = getbookbyidServices(bookid); 
        
        ctx.status = 200;
        ctx.body = books[index];

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const getBookbyQuery = (ctx: Context) => {
    try {
        const { title = '' } = ctx.request.query;
        

        const filtered = getBookbyQueryServices(title);
        ctx.status = 200;
        ctx.body = filtered;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }

}

export const updateBook = (ctx: Context) => {
    try {
        const body = ctx.request.body;
        const bookid = ctx.params.id;
        const userId = ctx.state.playload.id;
        updateBookServices(body , bookid, userId);
        ctx.status = 201;
        ctx.body = bookid;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }

}

export const deleteBook = (ctx: Context) => {
    try {
        const bookid = ctx.params.id;
        const userId = ctx.state.playload.id;
        deleteBookServices( bookid, userId);
        ctx.status = 201;
        ctx.body = bookid;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const getBookbyAuthid = (ctx: Context) => {
    try {
        const authid = ctx.state.playload.id;
        const filtered =  getBookbyAuthidServices(authid);
        ctx.status = 200;
        ctx.body = filtered;

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}
