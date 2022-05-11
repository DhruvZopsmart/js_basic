export class customError extends Error{
    message:string;
    statusCode:number;
    constructor(msg:string, status:number){
        super(msg)
        this.message= msg;
        this.statusCode=status;
    }
}