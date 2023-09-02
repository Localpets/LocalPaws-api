import { Router } from "express";
import {
    messageGetById,
    messageGetAll,
    messageCreate,
    messageUpdate,
    messageDelete,
    messageAddReaction,
    getMessagesReaction,
    messageRemoveReaction
} from '../controllers/message.controller.js';

const messageRouter = Router();

messageRouter.get('/get/:message_id', messageGetById);
messageRouter.get('/find/all/:user_id', messageGetAll);
messageRouter.post('/create', messageCreate);
messageRouter.put('/update/:message_id', messageUpdate);
messageRouter.delete('/delete/:message_id', messageDelete);
messageRouter.post('/add-reaction/:message_id', messageAddReaction);
messageRouter.get('/find/reaction/:message_id', getMessagesReaction);
messageRouter.delete('/remove-reaction/:message_id', messageRemoveReaction);


export default messageRouter;
