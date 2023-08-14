import { Router } from "express";
import { 
    commentGet, 
    commentGetAll, 
    commentPost, 
    commentPut,
    commentDelete } from '../controllers/comment.controller.js';


const commentRouter = Router();

commentRouter.get('/find/:comment_id', commentGet);
commentRouter.get('/find/post/:comment_post_id', commentGetAll);
commentRouter.post('/create', commentPost);
commentRouter.put('/update/:comment_id', commentPut);
commentRouter.delete('/delete/:comment_id', commentDelete);

export default commentRouter;