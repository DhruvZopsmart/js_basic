export class myError extends Error{

    statuscode:number;

    constructor(message:string , errstatus:number){
        super(message);
        this.name = "custom error";
        this.statuscode = errstatus;
    }
}
export class Authorization extends Error{
    statuscode = 401;
    constructor( ){
        super("user is not authorized");
        this.name = "user is not authorized"
    }
}
export class Notfound extends Error{
    statuscode =404;
    constructor(){
        super("id is not present");
        this.name = "id is not present";
    }
}
