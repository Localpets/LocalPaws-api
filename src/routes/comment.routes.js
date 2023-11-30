import { Router } from "express";
import { 
    commentGet, 
    commentGetAll, 
    commentPost, 
    commentPut,
    commentDelete,
    commentLike,
    commentGetLikes,
    commentDeleteLike,
    commentUpdateLike,
    commentGetAllByPostId,
    commentGetAllByUserId
} from '../controllers/comment.controller.js';
// Verificar token de usuario admin
import verifyToken from "../middlewares/authUserJWT.js";


const commentRouter = Router();
// COMMENT CRUD
commentRouter.get('/find/:comment_id', verifyToken, commentGet);
commentRouter.get('/find/post/:comment_post_id', verifyToken, commentGetAllByPostId);
commentRouter.get('/find/post/:comment_post_id', verifyToken, commentGetAll);
commentRouter.post('/create', verifyToken, commentPost);
commentRouter.put('/update/:comment_id', verifyToken, commentPut);
commentRouter.delete('/delete/:comment_id', verifyToken, commentDelete);
// GET ALL COMMENTS WITH USERS TO AN SPECIFICAL ID
commentRouter.get('/find/all/:user_id', verifyToken, commentGetAllByUserId);

// LIKE COMMENT CRUD 
commentRouter.post('/like/create/:comment_id', verifyToken, commentLike);
commentRouter.get('/likes/:comment_id', verifyToken, commentGetLikes);
commentRouter.delete('/like/delete/:comment_id/:user_id', verifyToken, commentDeleteLike);
commentRouter.put('/like/update/:comment_id', verifyToken, commentUpdateLike);

export default commentRouter;