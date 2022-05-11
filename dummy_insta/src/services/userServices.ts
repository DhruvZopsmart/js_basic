import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { Iuser } from "../constants/interfaces";
import { userData } from "../constants/data";
import { Notfound , myError} from "../error/error";
import { uservalidation } from "../validations/joi";
export const loginService = (body: { id: string, password: string }):Notfound|string => {
    const index = userData.findIndex(e => {
        return (e.id == body.id && e.password == body.password);
    })
    // console.log(body);
    if (index == -1) {
        throw new Notfound();
    }
    const token = jwt.sign({ id: body.id }, "secret-key");
    return token;
}
export const createUsersService = (user: any):myError|string => {
    const validated = uservalidation.validate(user);
    if (validated.error) {
        throw new myError(validated.error.message, 406);
    }
    const id = v4();
    let userobj: Iuser = { id, name: user.name, password: user.password, email: user.email };
    userData.push(userobj);
    return id;
}
export const getUserbyidServices = (id:string):Notfound|Iuser[]=>{
    let filtered;
        filtered = userData.filter((e) => {
            return e.id == id;
        })
        if (filtered.length == 0) {
            throw new Notfound();
        }
    return filtered;
}
export const getUserbyQueryServices = (name:(string[] | string)):Iuser[]=>{
    const query: string = Array.isArray(name) ? name[0] : name;
        let filtered;
        filtered = userData.filter(e => {
            return e.name.includes(query);
        })
        return filtered;

}
export const updateUserServices = (id:string , body:{name?:string ,email?:string, password?:string}):Notfound|void=>{

    const index = userData.findIndex(e => {
        return e.id == id;
    })

    if (index == -1) {
        throw new Notfound();
    }
    userData[index].name = body.name ? body.name : userData[index].name;
    userData[index].email = body.email ? body.email : userData[index].email;
    userData[index].password = body.password ? body.password : userData[index].password;

}
export const deleteUsersServices = (id:string): Notfound|void=>{
    let index;
        index = userData.findIndex(e => {
            return e.id == id;
        })
        if(index >-1){
            userData.splice(index,1);
        }
        else {
            throw new Notfound();
        }
}
export const getallusersServices = (reviews:string[] , books:string[])=> {
    //  console.log(query);
     const users:Iuser[]=[]
    //  const userData2 = [{id:'1',name:'dhruv'},{id:'2',name:'dd'},{id:'4',name:'idk'}];
     const filteredusers= userData.filter(e=>  {return reviews.includes(e.id) || books.includes(e.id);});
     console.log(filteredusers);
     return filteredusers;
}
