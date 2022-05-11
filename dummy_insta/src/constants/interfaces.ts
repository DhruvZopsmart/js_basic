export interface Iuser{
    name:string,
    email:string,
    password:string,
    id:string,
}   

export interface Ibook {
    bookId:string,
    userId:string,
    title:string,
    releaseDate:Date
}

export interface Ireview {
    bookId:string,
    userId:string,
    review:string,
    postedDate:Date
    reviewId:string
}