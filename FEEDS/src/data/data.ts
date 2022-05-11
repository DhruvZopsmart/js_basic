import { Ibook, Iuser, Iuserreturned } from "../const/interface";

export const err = {
    'response': {
        'status': 500,
        'statusText': 'Network Error'
    }
};
export const books:Ibook[] = [{
    'title': "naja naja",
    'releaseDate': "date",
    'bookId': "b1",
    'userId': 'u1'
}]
export const objReviews: object = {
    "b1": [{
        'bookId': 'b1',
        'userId': 'u1',
        'review': 'good',
        'postedDate': '12032001',
        'reviewId': 'r1'
    }]
};
export const users: Iuserreturned[] = [{
    "name": "dhruv",
    "id": "u1",
    "email": "db@gmail.com",
    "password": "123"

}]
const usersSendingback: Iuser[] = [
    {
        "name": "dhruv",
        "id": "u1",
        "email": "db@gmail.com",
    }
]
