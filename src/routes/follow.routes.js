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

// instanciar el Router
const followRouter = Router();


// Definir las rutas de follow
followRouter.post('/:followerId/:followedId', createFollow);
followRouter.get('/:follow_id', readFollowById);
followRouter.get('/user/:followerId', readAllFollowsByUserId);
followRouter.get('/followed/:followedId', readAllFollowsByFollowedId);
followRouter.delete('/:followerId/:followedId', deleteFollow);

// exportar el Router
export default followRouter;
