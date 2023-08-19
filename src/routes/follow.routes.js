// importar el Router de express
import { Router } from 'express';

// importar el controlador de follow
import {
    createFollow,
    readFollowById,
    readAllFollowsByUserId,
    readAllFollowsByFollowedId,
    deleteFollow
} from '../controllers/follow.controller.js';

// Verificar token de usuario admin
import verifyToken from '../middlewares/authJWT.js';

// instanciar el Router
const followRouter = Router();


// Definir las rutas de follow
followRouter.post('/:followerId/:followedId', verifyToken, createFollow);
followRouter.get('/:follow_id', verifyToken, readFollowById);
followRouter.get('/user/:followerId', verifyToken, readAllFollowsByUserId);
followRouter.get('/followed/:followedId', verifyToken, readAllFollowsByFollowedId);
followRouter.delete('/:followerId/:followedId', verifyToken, deleteFollow);

// exportar el Router
export default followRouter;
