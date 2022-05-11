import { Context } from "koa";
import { getallbooks as getallBooks } from "../services/getallbooks";
import { getallusers as getallUsers } from "../services/getallusers";
import { makeFeeds } from "../services/makeFeeds";
import { getreviews as getReviews } from "../services/getreviews";
export const feeds = async (ctx: Context) => {
    try {
        const books = await getallBooks();
        //console.log("Books", books);
        const objReviews = await getReviews(books);
        //console.log("Object reviews", objReviews);
        const users = await getallUsers(books, objReviews);
        // console.log(14, users);
        const feeds = makeFeeds(books, objReviews, users);
        // console.log(16,feeds)
        ctx.status = 200;
        ctx.body = { data: { feeds } };
    } catch (err) {
        ctx.status = err.statusCode || 500;
        ctx.body = err.message;
    }
}