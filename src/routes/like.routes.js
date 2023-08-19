import { Router } from "express";
import { 
    createLike,
    readLikeById,
    readAllLikesByUserId,
    readAllLikesByPostId,
    deleteLike 
} from '../controllers/like.controller.js';

// Verificar token de usuario admin
import verifyToken from "../middlewares/authJWT.js";

const likeRouter = Router();

// Definir las rutas de like
likeRouter.post('/:like_type/:user_id/:post_id', verifyToken, createLike);
likeRouter.get('/:like_id', verifyToken, readLikeById);
likeRouter.get('/user/:user_id', verifyToken, readAllLikesByUserId);
likeRouter.get('/post/:post_id', verifyToken, readAllLikesByPostId);
likeRouter.delete('/:like_id', verifyToken, deleteLike);

export default likeRouter;
