import dotenv from "dotenv"
import app from "../index";
import  request  from 'supertest';
dotenv.config();
describe('mocking', () => {

   describe('running feeds',()=>{
     const returnedData = {
      "feeds": [
        {
          "book": {
            "title": "naja naja",
            "releaseDate": "date",
            "bookId": "b1",
            "userId": "u1"
          },
          "author": {
            "name": "dhruv",
            "id": "u1",
            "email": "db@gmail.com"
          },
          "review": [
            {
              "review": "good",
              "reviewId": "r1",
              "postedDate": "12032001",
              "bookId": "b1",
              "userId": "u1",
              "reviewerDetails": {
                "name": "dhruv",
                "id": "u1",
                "email": "db@gmail.com"
              }
            }
          ]
        }
      ]
    }
        test('status code should be   200 && data should match ' , async()=>{
            const response = await request(app.callback()).get('/feeds').set('authorization', `${process.env.TOKEN}`);;
            // console.log(response);
            const data = JSON.parse(response.text);
            expect(data.data).toEqual(returnedData)             
        })
    })

})