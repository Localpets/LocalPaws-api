import { Router } from "express";
// import { 
//     userGet, 
//     userDelete, 
//     userPut, 
//     userPost } from '../controllers/user.controller.js';


const userRouter = Router();

userRouter.get('/find/:user_id', (req, res) => res.send('GET request to the user page'));

export default userRouter;