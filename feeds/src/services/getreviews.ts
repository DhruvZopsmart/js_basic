import axios from "axios"
import { Ibook, Ireview, IReviewII } from "../const/interface";
import { customError } from "../errors/customError";

export const getreviews = async (books: Ibook[]): Promise<Object> => {
    const booksUserIds = books.map(book => book.bookId);
    const reviewsObj = await axios.post("http://localhost:3001/review/reviews", {
        headers: {
            Authorization: `${process.env.TOKEN}`
        },
        data: {
            bookIds: booksUserIds,
            limit: `${process.env.LIMIT}`
        }

    }).then(res => res.data).catch(error => {
        const { status, statusText } = error.response;
        console.log(13, status, statusText)
        throw new customError(statusText, status)
    });
    return reviewsObj;


}