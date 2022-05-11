import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { verify } from "../middleware/middleware";
import dotenv from "dotenv";
import { getreviewsbyBookId, createReview,delteReview,updateReview, get2reviews} from "../controllers/reviewControllers";
const reviewRouter = new Router();
reviewRouter.prefix('/review');

// reviewRouter.get('/:id' ,verify, getReviewbyId); // get review for this book
reviewRouter.get('/allreview/:id',verify, getreviewsbyBookId);
reviewRouter.post('/reviews', bodyParser() ,verify, get2reviews)
// reviewRouter.get('/')       // get all reivews for this user
reviewRouter.post('/:id',bodyParser(),verify, createReview)       //create review for this user and this book 
reviewRouter.delete('/:id' ,verify,  delteReview)     // delte this review
reviewRouter.put('/:id', bodyParser(),verify, updateReview)        //update this review


export default reviewRouter;