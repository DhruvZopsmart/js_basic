import { Ibook, IFeeds, Ireview, IReviewII, Iuser } from "../const/interface";

export const makeFeeds = (books: Ibook[], reviews: any, users: Iuser[]) => {
    const user:Map<string,Iuser>= new Map();
    // const review = new Map();

    users.forEach(e => { user.set(e.id, e) });
    // reviews.forEach((e: IReviewII[]) => {
    //     e.forEach((element: IReviewII) => {
    //         if (review.get(element.bookId) != undefined) {
    //             const value = review.get(element.bookId);
    //             value.push(element);
    //             review.set(element.bookId, value);
    //         }
    //         else {
    //             review.set(element.bookId, [element]);
    //         }
    //     })
    // })

    //console.log(books , reviews);
    const feeds: IFeeds[] = [];
    books.forEach((book: Ibook) => {
        const bookReviews: IReviewII[] = reviews[book.bookId];
        let finalReviews: Ireview[] = [];
        if (bookReviews != undefined) {
            bookReviews.forEach((e: IReviewII) => {
                finalReviews.push({
                    review: e.review,
                    reviewId: e.reviewId,
                    postedDate: e.postedDate,
                    bookId: e.bookId,
                    userId: e.userId,
                    reviewerDetails: user.get(e.userId)!
                })
            })
        }
    
        const obj: IFeeds = {
            book: book,
            author: user.get(book.userId)!,
            review: finalReviews
        };
        feeds.push(obj);

    })
    //console.log(feeds);
    return feeds;
}