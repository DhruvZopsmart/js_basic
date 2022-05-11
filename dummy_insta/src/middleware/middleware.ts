import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import { userData } from "../constants/data";
import { Authorization, myError } from "../error/error";
export function verify(ctx: Context, next: Next) {
    // const bearerHeader = ctx.header["authorization"];
    // ctx.token = bearerHeader;
    try {
        const bearerHeader = ctx.header["authorization"];
        ctx.token = bearerHeader;
        // console.log(11,bearerHeader)
        jwt.verify(ctx.token, "secret-key", (err: any, authData: any) => {
            // console.log(bearerHeader, authData);
            if (err || !authData) {  
                throw new myError(err.message, 401);
            }
            const index = userData.findIndex(e => {
                return (e.id == authData.id)
            })
            if (index == -1) {
                throw new Authorization();
            }
            ctx.state.playload = authData;
            // console.log(26 + " " + ctx.state.playload);
            next();
        })
    }
    catch (error:any) {
        ctx.status = error.statuscode||500;
        ctx.body = error.message;
    }
}
