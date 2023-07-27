import { Router } from "express";
// import { 
//     userGet, 
//     userDelete, 
//     userPut, 
//     userPost } from '../controllers/post.controller.js';


const postRouter = Router();

postRouter.get('/find/:post_id', (req, res) => res.send('GET request to the user page'));

export default postRouter;