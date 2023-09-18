// importar el Router de express
import { Router } from 'express';

// importar el controlador de follow
import {
    createFollow,
    readFollowById,
    readAllFollowsByUserId,
    readAllFollowsByFollowedId,
    deleteFollow,
    getFollowersCountByUserId,
    getFollowedUsersCountByUserId
} from '../controllers/follow.controller.js';

// Verificar token de usuario admin
import verifyToken from '../middlewares/authJWT.js';

// instanciar el Router
const followRouter = Router();


// Definir las rutas de follow
followRouter.post('/create', verifyToken, createFollow);
followRouter.get('/find/:follow_id', verifyToken, readFollowById);
followRouter.get('/find/user/:followerId', verifyToken, readAllFollowsByUserId);
followRouter.get('/find/followed/:followedId', verifyToken, readAllFollowsByFollowedId);
followRouter.delete('/delete/:followerId/:followedId', verifyToken, deleteFollow);
followRouter.get('/followers/count/:userId', verifyToken, getFollowersCountByUserId);
followRouter.get('/followed/count/:userId', verifyToken, getFollowedUsersCountByUserId);

// exportar el Router
export default followRouter;
