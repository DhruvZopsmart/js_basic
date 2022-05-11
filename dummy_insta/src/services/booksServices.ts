import { v4 } from "uuid";
import { Iuser , Ibook} from "../constants/interfaces";
import { userData , books } from "../constants/data";
import { Notfound , myError, Authorization} from "../error/error";
import { bookvalidation } from "../validations/joi";

export const createBookServices = (bookbody :{title:string} , userid:string):Notfound|myError|string=>{
    const validated = bookvalidation.validate(bookbody);
        if (validated.error) {
            throw new myError(validated.error.message, 406);
        }
        // const index = userData.findIndex((e: Iuser) => e.id === userid);
        // if (index === -1) {
        //     throw new Notfound();
        // }
        const id = v4();
        let bookobj: Ibook = { bookId: id, userId: userid, title: bookbody.title, releaseDate: new Date() };
        books.push(bookobj);

        return id;
}
export const getbookbyidServices = (bookid:string):number =>{
    const index = books.findIndex((e) => {
        return e.bookId == bookid;
    })
    if (index == -1) {
        throw new Notfound();
    }
    return index;
}
export const getBookbyQueryServices = (title :string | string[] ):Ibook[]=>{
    const query: string = Array.isArray(title) ? title[0] : title;
        let filtered;
        filtered = books.filter(e => {
            return e.title.includes(query);
        })
    return filtered;
}
export const updateBookServices = (body:{title:string} , bookid:string , userId:string) : myError|Authorization|void=>{

    const index = books.findIndex(e => {
        return (e.bookId == bookid )
    })

    if (index == -1) {
        throw new myError("id not present", 404);
    }
    if(books[index].userId != userId){
        throw new Authorization();
    }
    books[index].title = body.title ? body.title : books[index].title;
}
export const deleteBookServices = (  bookid:string, userId:string):Authorization|Notfound|void=>{
    let bIndex;
    bIndex = books.findIndex(e => {
        return (e.bookId == bookid);
    })
    
    if(bIndex > -1){
        if(books[bIndex].userId != userId ){
            throw new Authorization();
        }
        books.splice(bIndex,1);
    }else{
        throw new Notfound();
    }
}
export const getBookbyAuthidServices = (authid:string):Ibook[]|myError=>{
        let filtered;
        // console.log(authid)
        filtered = books.filter((e) => {
            // console.log(e);
            return e.userId == authid;
        })
    return filtered;
}