import { app } from '../index';
import request from 'supertest';
import { userData } from '../constants/data';

let id: string = '';
let token: string = '';
let bookId: string = '';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5NDE3NDYyLTUyNTYtNGYyMC1iMzQ4LTA1NWVjNDA5MGQ0ZSIsImlhdCI6MTY1MTY1Nzk4NH0.K8nAKS21fEqZ6wFgnSCHZpZ1JossUqm7lfQG5DhNqoU';

async function creatingUserAndGettingToken() {
    let response = await request(app.callback()).post('/users/').send({
        "name": "dbbbbbb",
        "email": "db@gmail.com",
        "password": "dhruvbatra"
    });
    expect(response.statusCode).toBe(201);
    expect(response.type).toBe('application/json');
    // console.log(response.text);

    const idd = JSON.parse(response.text).id;
    id = idd; 
    // console.log(id);
    response = await request(app.callback()).post('/users/login').send({
        'id': `${id}`,
        'password': `dhruvbatra`
    })
    expect(response.statusCode).toBe(200);
    token = JSON.parse(response.text).token;
}

describe('book', () => {
    beforeAll(async () => {
        await creatingUserAndGettingToken();
    })
    describe('creating book ', () => {
        test('when book title is given', async () => {
            const response = await request(app.callback()).post('/book/').send({
                'title': 'naja naja'
            }).set('authorization', `${token}`)
            expect(response.statusCode).toBe(201);
            expect(response.type).toBe('application/json');
            bookId = JSON.parse(response.text).id;
            // console.log(response.text);
            // console.log(bookId);
        })
        test('when book title is not given', async () => {
            const response = await request(app.callback()).post('/book/').send({
                '': 'naja naja'
            }).set('authorization', `${token}`)
            expect(response.statusCode).toBe(406);
        })
        test('when token is not present', async () => {
            const response = await request(app.callback()).post('/book/').send({
                'title': 'naja naja'
            }).set('authorization', ``)
            expect(response.statusCode).toBe(401);
        })
        test('when token is valid but user is not present', async () => {
            const response = await request(app.callback()).post('/book/').send({
                'title': 'naja naja'
            })
                .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5NDE3NDYyLTUyNTYtNGYyMC1iMzQ4LTA1NWVjNDA5MGQ0ZSIsImlhdCI6MTY1MTY1Nzk4NH0.K8nAKS21fEqZ6wFgnSCHZpZ1JossUqm7lfQG5DhNqoU');
            expect(response.statusCode).toBe(401);
        })

    })
    describe('get book by auth id', () => {
        test('when token is present', async () => {
            const response = await request(app.callback()).get('/book/auth').set('authorization', `${token}`)
            console.log(response.text);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
        })
        test('when user is not present', async () => {
            const response = await request(app.callback()).get('/book/auth')
                .set('authorization', `${fakeToken}`);
            expect(response.statusCode).toBe(401);
        })
        test('when token is not valid', async () => {
            const response = await request(app.callback()).get('/book/auth')
                .set('authorization', `$}`);
            expect(response.statusCode).toBe(401);
        })

    })
    describe('get book by id', () => {
        test('when bookId is not present', async () => {
            const response = await request(app.callback()).get('/book/1').set('authorization', `${token}`);
            expect(response.statusCode).toBe(404)
        })
        test('when bookId is  present', async () => {
            const response = await request(app.callback()).get(`/book/${bookId}`).set('authorization', `${token}`);
            expect(response.statusCode).toBe(200)
            expect(response.type).toBe('application/json');
        })
        test('when user is not present', async () => {
            const response = await request(app.callback()).get(`/book/${bookId}`)
                .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5NDE3NDYyLTUyNTYtNGYyMC1iMzQ4LTA1NWVjNDA5MGQ0ZSIsImlhdCI6MTY1MTY1Nzk4NH0.K8nAKS21fEqZ6wFgnSCHZpZ1JossUqm7lfQG5DhNqoU');
            expect(response.statusCode).toBe(401);
        })
        test('when token is not valid', async () => {
            const response = await request(app.callback()).get(`/book/${bookId}`)
                .set('authorization', `$}`);
            expect(response.statusCode).toBe(401);
        })

    })
    describe('get book by query', () => {
        test('when token is not valid', async () => {
            const response = await request(app.callback()).get(`/book?title=naja`)
                .set('authorization', `$}`);
            expect(response.statusCode).toBe(401);
        })
        test('when user is not present', async () => {
            const response = await request(app.callback()).get(`/book?title=naja`)
                .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5NDE3NDYyLTUyNTYtNGYyMC1iMzQ4LTA1NWVjNDA5MGQ0ZSIsImlhdCI6MTY1MTY1Nzk4NH0.K8nAKS21fEqZ6wFgnSCHZpZ1JossUqm7lfQG5DhNqoU');
            expect(response.statusCode).toBe(401);
        })
        test('when token is valid and user is present', async () => {
            const response = await request(app.callback()).get(`/book?title=naja`)
                .set('authorization', `${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json')
            console.log(response.text)
        })
    })
    describe('update book ', () => {

        test('when the book is not present', async () => {
            const response = await request(app.callback()).put(`/book/${1}`)
                .send({
                    'title': 'naja naja mitran to dooor'
                }).set('authorization', `${token}`);
            //    console.log(response.text);
            expect(response.statusCode).toBe(404);
        })

        test('when the user  is not authorized', async () => {
            const response = await request(app.callback()).put(`/book/${bookId}`)
                .send({
                    'title': 'naja naja mitran to dooor'
                }).set('authorization', `${fakeToken}`);
            //    console.log(response.text);
            expect(response.statusCode).toBe(401);
        })

        test('when user successfully updated', async () => {
            const response = await request(app.callback()).put(`/book/${bookId}`)
                .send({
                    'title': 'naja naja mitran to door'
                }).set('authorization', `${token}`);
            //    console.log(response.text);
            expect(response.statusCode).toBe(201);

        })

        test('when token is not valid', async () => {
            const response = await request(app.callback()).put(`/book/${bookId}`)
                .set('authorization', `$}`);
            expect(response.statusCode).toBe(401);
        })

        test('when user is not present', async () => {
            const response = await request(app.callback()).put(`/book/${bookId}`)
                .set('authorization', `${fakeToken}`);
            expect(response.statusCode).toBe(401);
        })

    })

    describe('delete book', () => {

        test('when the book is not present', async () => {
            const response = await request(app.callback()).delete(`/book/${1}`)
                .set('authorization', `${token}`);
            //    console.log(response.text);
            expect(response.statusCode).toBe(404);
        })
        test('when the user  is not authorized', async () => {
            const response = await request(app.callback()).delete(`/book/${bookId}`)
            .set('authorization', `${fakeToken}`);
            expect(response.statusCode).toBe(401);
        })

        test('when user successfully deleted', async () => {
            const response = await request(app.callback()).delete(`/book/${bookId}`)
            .set('authorization', `${token}`);
            expect(response.statusCode).toBe(201);

        })

        test('when token is not valid', async () => {
            const response = await request(app.callback()).delete(`/book/${bookId}`)
                .set('authorization', `$}`);
            expect(response.statusCode).toBe(401);
        })
        test('when user is not present', async () => {
            const response = await request(app.callback()).delete(`/book/${bookId}`)
                .set('authorization', `${fakeToken}`);
            expect(response.statusCode).toBe(401);
        })
    })
})
