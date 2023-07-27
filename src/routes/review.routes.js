import { Router } from "express";
// import { 
//     userGet, 
//     userDelete, 
//     userPut, 
//     userPost } from '../controllers/review.controller.js';


const reviewRouter = Router();

reviewRouter.get('/find/:review_id', (req, res) => res.send('GET request to the user page'));

export default reviewRouter;