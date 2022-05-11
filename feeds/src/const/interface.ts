export interface Iuser {
    id: string,
    name: string,
    email:string,
}
export interface Ibook {
    title: string,
    releaseDate: string,
    bookId: string,
    userId: string,
}

export interface Ireview {
    review: string,
    reviewId: string,
    postedDate: string,
    bookId: string,
    reviewerDetails: Iuser,
    userId:string
}

export interface IReviewII {
    bookId: string,
    userId: string,
    review: string,
    postedDate: string
    reviewId: string
}

export interface IFeeds {
    author: Iuser,
    book: Ibook,
    review: Ireview[]
}
export interface Iuserreturned{
    id: string,
    name: string,
    email:string,
    password:string
}