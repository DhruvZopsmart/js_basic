import { books, objReviews, users } from '../data/data'

export default {
    get: jest.fn().mockImplementationOnce(() => Promise.resolve({
        data:books
    })),
    post: jest.fn().mockImplementation((url) => {
        if (url === 'http://localhost:3001/users/getall') {
            return Promise.resolve({data:users})
        }
        if (url === 'http://localhost:3001/review/reviews') {
            return Promise.resolve({ data: objReviews })
        }
       
        //return Promise.resolve({ data: users });
    })
}