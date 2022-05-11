import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import { customError } from "../errors/customError";
export function verify(ctx: Context, next: Next) {
    // const bearerHeader = ctx.header["authorization"];
    // ctx.token = bearerHeader;
    try {
        const bearerHeader = ctx.header["authorization"];
        console.log(bearerHeader)
        // console.log(11,bearerHeader)
        if(!bearerHeader){
            throw new customError('token not present',404);
        }
        ctx.state.token =  bearerHeader;
        console.log("hhhh")
        next();
    }
    catch (error) {
        console.log("uuu")
        ctx.status = error.statuscode||500;
        ctx.body = error.message;
    }
}
