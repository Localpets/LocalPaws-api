import { Router } from "express";
// import { 
//     userGet, 
//     userDelete, 
//     userPut, 
//     userPost } from '../controllers/like.controller.js';


const likeRouter = Router();

likeRouter.get('/find/:like_id', (req, res) => res.send('GET request to the user page'));

export default likeRouter;