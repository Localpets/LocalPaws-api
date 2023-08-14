import { Router } from "express";
import { 
    createLike,
    readLikeById,
    readAllLikesByUserId,
    readAllLikesByPostId,
    deleteLike } from '../controllers/like.controller.js';


const likeRouter = Router();

// Definir las rutas de like
likeRouter.post('/:like_type/:user_id/:post_id', createLike);
likeRouter.get('/:like_id', readLikeById);
likeRouter.get('/user/:user_id', readAllLikesByUserId);
likeRouter.get('/post/:post_id', readAllLikesByPostId);
likeRouter.delete('/:like_id', deleteLike);

export default likeRouter;
