import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { Iuser, Ibook, Ireview } from "../constants/interfaces";
import { userData, books } from "../constants/data";
import { Notfound, myError, Authorization } from "../error/error";
import { reviewvalidation } from "../validations/joi";
import { reviews } from "../constants/data";
export const createReviewServices = (body: { review: string }, bookId: string, userId: string): string | myError => {
    const validated = reviewvalidation.validate(body);
    if (validated.error) {
        throw new myError(validated.error.message, 406);
    }
    const bookIndex = books.findIndex((e) => e.bookId === bookId)
    if (bookIndex == -1)
        throw new myError("book with this id not present", 406);
    const userIndex = userData.findIndex(e => e.id === userId)
    if (userIndex == -1)
        throw new myError("user Not present", 406);
    const reviewId = v4();
    const reviewobj: Ireview = { bookId, userId: userId, review: body.review, postedDate: new Date(), reviewId };
    reviews.push(reviewobj);

    return reviewId;
}
export const updateReviewServices = (body: { review: string }, userId: string, reviewid: string):myError | Authorization |void => {
    console.log(body, userId, reviewid);
    console.log('update review services ');
    const index = reviews.findIndex(e => {
        return e.reviewId == reviewid;
    })
    console.log("dsa1");
    if (index == -1) {
        throw new myError("review with this id not present", 404);
    }
    console.log('dsa2');

    const bindex = books.findIndex(e => { return e.bookId == reviews[index].bookId })
    if (bindex == -1) {
        throw new myError("book with this id is not present", 406);
    }
    console.log('dsa3');

    if (reviews[index].userId != userId) {
        throw new Authorization();
    }
    console.log('dsa4');
    reviews[index].review = body.review || reviews[index].review;
    // reviews[index].review = body.review ? body.review : reviews[index].review;
}
export const delteReviewService = (reviewId: string, userId: string):Notfound|Authorization|void => {
    let rIndex: number;
    // let robj:Ireview|undefined=undefined;
    rIndex = reviews.findIndex(e => {
        return (e.reviewId == reviewId)
    })

    const bindex = books.findIndex(e => {
        return e.bookId == reviews[rIndex].bookId;
    })

    if (bindex == -1) {
        throw new Notfound();
    }
    if (rIndex > -1) {
        if (reviews[rIndex].userId != userId) {
            throw new Authorization();
        }
        reviews.splice(rIndex, 1);
    } else {
        throw new Notfound();
    }
}
export const getreviewsbyBookIdServices = (bookId: string):myError| Ireview[] => {
    let filtered;
    filtered = reviews.filter((e) => {
        return e.bookId == bookId;
    })
    
    return filtered;
}
export const get2reviewsServices = (bookIds:string[],limit:number)=>{
   
    const count = new Map;
    let obj:any = {};
    console.log(bookIds);
    console.log(limit);
    bookIds.forEach( (e:string)=>{
        // count.set(e,[]);
        obj[e]=[];
    } )
    reviews.forEach( (e)=> {
        // const value = count.get(e.bookId);
        const value = obj[e.bookId];
        if(value && value.length < limit){
            value.push(e);
            // count.set(e.bookId,value);
            obj[e.bookId]=value;
        }
    })
    // console.log(95,count);
    console.log(95,obj)
    // return  Array.from(count.values());
    return obj;

}