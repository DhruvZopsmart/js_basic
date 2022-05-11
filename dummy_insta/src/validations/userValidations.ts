import { Context } from "koa";
import { myError } from "../error/error";
export function userValidations(ctx:Context){
    let user= ctx.request.body;
    if(!user.name){
        throw new myError("name not given" , 406);
    } else if(!user.email){
        throw new myError("email not given" , 406);
    } else if(!user.password){
        throw new myError("password not given", 406);
    }
}

export function bookValidations(ctx:Context){
    let user= ctx.request.body;
    if(!user.userid){
        throw new myError("userid not given" , 406);
    } else if(!user.title){
        throw new myError("title not given" , 406);
    } else if(!user.releaseDate){
        throw new myError("releaseDate not given", 406);
    }
}

export function reviewValidations(ctx:Context){
    let review= ctx.request.body;
    if(!review.review){
        throw new myError("review not given" , 406);
    } else if(!review.userId){
        throw new myError("userId not given" , 406);
    }
}
