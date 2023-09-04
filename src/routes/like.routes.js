import { Router } from "express";
import { 
    createLike,
    readLikeById,
    readAllLikesByUserId,
    readAllLikesByPostId,
    deleteLike 
} from '../controllers/like.controller.js';

const likeRouter = Router();

// Definir las rutas de like
likeRouter.post('/create/', createLike);
likeRouter.get('/find/id/:like_id', readLikeById);
likeRouter.get('/user/:user_id', readAllLikesByUserId);
likeRouter.get('/post/:post_id', readAllLikesByPostId);
likeRouter.delete('/delete/:post_id/:user_id', deleteLike);

export default likeRouter;
