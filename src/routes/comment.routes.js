import { Router } from "express";
// import { 
//     userGet, 
//     userDelete, 
//     userPut, 
//     userPost } from '../controllers/comment.controller.js';


const commentRouter = Router();

commentRouter.get('/find/:comment_id', (req, res) => res.send('GET request to the user page'));

export default commentRouter;