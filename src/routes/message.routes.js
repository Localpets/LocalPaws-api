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
    GetResponsesByMessageId,
    GetUnreadMessagesByUserId,
    createGroup,
    getGroupById,
    getAllGroups,
    getGroupsByUserId,
    createGroupParticipant,
    getGroupParticipants,
    createMessageInGroup,
    getMessageInGroupById,
    getMessagesInGroup,
} from '../controllers/message.controller.js';

const messageRouter = Router();

// Rutas relacionadas con mensajes individuales
messageRouter.get('/get/:message_id', messageGetById);
messageRouter.post('/create', messageCreate);
messageRouter.put('/update/:message_id', messageUpdate);
messageRouter.delete('/delete/:message_id', messageDelete);

// Rutas relacionadas con reacciones a mensajes
messageRouter.post('/add-reaction/:message_id', messageAddReaction);
messageRouter.get('/find/reaction/:message_id', getMessagesReaction);
messageRouter.delete('/remove-reaction/:reaction_id', messageRemoveReaction);
messageRouter.get('/find/reactions/all', getAllMessagesReaction);

// Rutas relacionadas con estados de mensajes
messageRouter.post('/create-status', messageStatusCreate);
messageRouter.delete('/delete-status/:message_id', messageStatusDelete);
messageRouter.get('/get-status/:user_id/:message_id', getMessageStatus);
messageRouter.get('/get-status/all', GetAllMessagesStatus);
messageRouter.get('/get-unread-status/:user_id', GetUnreadMessagesByUserId);

// Rutas relacionadas con marcado de mensajes
messageRouter.put('/mark-as-read/:user_id/:message_id', markMessageAsRead);
messageRouter.put('/mark-as-deleted/:user_id/:message_id', markMessageAsDeleted);

// Rutas relacionadas con respuestas a mensajes
messageRouter.get('/get-responses/:message_id', GetResponsesByMessageId);

// Rutas relacionadas con listado de mensajes
messageRouter.get('/find/all/:user_id', messageGetAll);

// Rutas relacionadas con grupos
messageRouter.post('/group/create', createGroup);
messageRouter.get('/group/get/:group_id', getGroupById);
messageRouter.get('/group/get-all', getAllGroups);
messageRouter.get('/group/get-all/:user_id', getGroupsByUserId);

// Rutas relacionadas con participantes de grupo
messageRouter.post('/group/add-participant', createGroupParticipant);
messageRouter.get('/group/get-participants/:group_id', getGroupParticipants);

// Rutas relacionadas con mensajes de grupo
messageRouter.post('/group/create-message', createMessageInGroup);
messageRouter.get('/group/get-message/:message_id', getMessageInGroupById);
messageRouter.get('/group/get-messages/:group_id', getMessagesInGroup);


export default messageRouter;
