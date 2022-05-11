import axios from "axios"
import { Ibook, IReviewII, Iuser, Iuserreturned } from "../const/interface";
import { customError } from "../errors/customError";

export const getallusers = async (books: Ibook[], objReviews: Object) => {
    let reviewUserIds: string[] = [];
    const reviews = Object.values(objReviews);
    
    reviews.forEach(bookReviews => {
        bookReviews.forEach((review:any) => {
            reviewUserIds.push(review.userId);
        })
    })

    const booksUserIds :string[]= books.map(book => book.userId);

    console.log('his');
    const allUsers: Iuserreturned[]= await axios.post("http://localhost:3001/users/getall", {
        headers: {
            Authorization: `${process.env.TOKEN}`
        }
        , data: {
            reviews: reviewUserIds,
            books: booksUserIds
        }
    }).then(res => res.data).catch(error => {
        const { status, statusText } = error.response;
        throw new customError(statusText, status)
    });
    let users: Iuser[] = [];
    allUsers.forEach((e: Iuserreturned) => {
        const user = { name: e.name, id: e.id, email: e.email };
        users.push(user);
    })
    return users;
}