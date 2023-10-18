import { Router } from "express";
import { 
    createLike,
    readLikeById,
    readAllLikesByUserId,
    readAllLikesByPostId,
    deleteLike,
    updateLikeById
} from '../controllers/like.controller.js';

// Importar metodos de verificacion de tokens
import verifyToken from '../middlewares/authUserJWT.js';

const likeRouter = Router();

// Definir las rutas de like
likeRouter.post('/create/',verifyToken, createLike);
likeRouter.put('/update/:like_id',verifyToken, updateLikeById);
likeRouter.get('/find/id/:like_id',verifyToken, readLikeById);
likeRouter.get('/user/:user_id',verifyToken, readAllLikesByUserId);
likeRouter.get('/post/:post_id',verifyToken, readAllLikesByPostId);
likeRouter.delete('/delete/:post_id/:user_id',verifyToken, deleteLike);

export default likeRouter;
