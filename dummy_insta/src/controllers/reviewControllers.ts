import { Context } from "koa";
import { createReviewServices, delteReviewService, get2reviewsServices, getreviewsbyBookIdServices, updateReviewServices } from "../services/reviewServices";



//review

export const createReview = (ctx: Context) => {
    try {
        const bookId = ctx.params.id;
        const body = ctx.request.body;
        const userId = ctx.state.playload.id;

        const reviewId = createReviewServices(body , bookId, userId);
        ctx.status = 201;
        ctx.body = { reviewId };
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}
export const updateReview = (ctx: Context) => {
    try {
        const body = ctx.request.body;
        const reviewid = ctx.params.id;
        const userId = ctx.state.playload.id;
        updateReviewServices(body, userId,reviewid);
        ctx.status = 201;
        ctx.body = reviewid;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const delteReview = (ctx: Context) => {
    try {
        const reviewId = ctx.params.id;
        const userId = ctx.state.playload.id;
        delteReviewService(reviewId,userId);
        ctx.status = 201;
        ctx.body = reviewId;
    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}

export const getreviewsbyBookId = (ctx: Context) => {
    try {
        const bookId = ctx.params.id;
        const filtered = getreviewsbyBookIdServices(bookId);
        ctx.status = 200;
        ctx.body = filtered;

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}
export const get2reviews = (ctx:Context)=>{
    try {
        const bookIds =  ctx.request.body.bookIds;
        const limit =  ctx.request.body.limit;
        const filtered = get2reviewsServices(bookIds,limit) ;
        // console.log(92,filtered);
        ctx.status = 200;
        ctx.body = filtered;

    } catch (error: any) {
        ctx.status = error.statuscode;
        ctx.body = error.message;
    }
}