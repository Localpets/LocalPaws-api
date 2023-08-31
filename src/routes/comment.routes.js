import { Router } from "express";
import { 
    commentGet, 
    commentGetAll, 
    commentPost, 
    commentPut,
    commentDelete 
} from '../controllers/comment.controller.js';
// Verificar token de usuario admin
import verifyToken from "../middlewares/authJWT.js";


const commentRouter = Router();

commentRouter.get('/find/:comment_id', verifyToken, commentGet);
commentRouter.get('/find/post/:comment_post_id', verifyToken, commentGetAll);
commentRouter.post('/create', verifyToken, commentPost);
commentRouter.put('/update/:comment_id', verifyToken, commentPut);
commentRouter.delete('/delete/:comment_id', verifyToken, commentDelete);

export default commentRouter;