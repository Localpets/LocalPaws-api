import { Router } from "express";
import {
    messageGetById,
    messageGetAll,
    messageCreate,
    messageUpdate,
    messageDelete,
    messageAddReaction,
    getMessagesReaction,
    getAllMessagesReaction,
    messageRemoveReaction,
    getMessageStatus,
    GetAllMessagesStatus,
    messageStatusDelete,
    markMessageAsRead,
    markMessageAsDeleted,
    messageStatusCreate,
    GetResponsesByMessageId
} from '../controllers/message.controller.js';

const messageRouter = Router();

messageRouter.get('/get/:message_id', messageGetById);
messageRouter.get('/find/all/:user_id', messageGetAll);
messageRouter.post('/create', messageCreate);
messageRouter.put('/update/:message_id', messageUpdate);
messageRouter.delete('/delete/:message_id', messageDelete);
messageRouter.post('/add-reaction/:message_id', messageAddReaction);
messageRouter.get('/find/reaction/:message_id', getMessagesReaction);
messageRouter.delete('/remove-reaction/:reaction_id', messageRemoveReaction);
messageRouter.get('/find/reactions/all', getAllMessagesReaction);
messageRouter.post('/create-status', messageStatusCreate);
messageRouter.delete('/delete-status/:message_id', messageStatusDelete);
messageRouter.get('/get-status/:user_id/:message_id', getMessageStatus);
messageRouter.get('/get-status/all', GetAllMessagesStatus);
messageRouter.put('/mark-as-read/:user_id/:message_id', markMessageAsRead);
messageRouter.put('/mark-as-deleted/:user_id/:message_id', markMessageAsDeleted);
messageRouter.get('/get-responses/:message_id', GetResponsesByMessageId);


export default messageRouter;
