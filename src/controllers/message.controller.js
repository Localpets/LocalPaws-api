// importar el modelo del mensaje
import Message from "../models/message.model.js";

import { io } from "socket.io-client"; // Importa el cliente de Socket.IO

const port = process.env.PORT;
const socket = io(`http://localhost:${port}`); // Cambia la URL por la de tu servidor

export async function messageGetById(req, res) {
    try {
        const id = parseInt(req.params.message_id);
        const message = await Message.getMessageById(id);
        res.status(200).json({
            msg: "Mensaje obtenido correctamente",
            ok: true,
            message
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener el mensaje"
        });
    }
}

export async function messageGetAll(req, res) {
    try {
        const userId = parseInt(req.params.user_id);
        const messages = await Message.getAllMessagesByUserId(userId);
        res.status(200).json({
            msg: "Mensajes obtenidos correctamente",
            ok: true,
            messages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener los mensajes"
        });
    }
}

export async function messageCreate(req, res) {
    const { sender_id, receiver_id, text, room } = req.body;
    try {
      const message = await Message.createMessage(sender_id, receiver_id, text, room);
  
      res.status(200).json({
        msg: "Mensaje creado correctamente",
        ok: true,
        message
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al crear el mensaje"
      });
    }
  }
  

export async function messageUpdate(req, res) {
    const { message_id } = req.params;
    const { text, edited } = req.body;
    try {
        const updatedMessage = await Message.updateMessage(parseInt(message_id), text, edited);
        res.status(200).json({
            msg: "Mensaje actualizado correctamente",
            ok: true,
            message: updatedMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el mensaje"
        });
    }
}

export async function messageDelete(req, res) {
    const { message_id } = req.params;
    try {
        await Message.deleteMessage(parseInt(message_id));

        res.status(200).json({
            msg: "Mensaje eliminado correctamente",
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar el mensaje"
        });
    }
}

export async function messageAddReaction(req, res) {
    const { message_id } = req.params;
    const { user_id, Reaction } = req.body;
    try {
        const updatedMessage = await Message.addReaction(
            parseInt(message_id),
            parseInt(user_id),
            Reaction 
        );
        res.status(200).json({
            msg: "Like agregado correctamente",
            ok: true,
            message: updatedMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al agregar el like al mensaje"
        });
    }
}

export async function messageRemoveReaction(req, res) {
    const { message_id } = req.params;
    const { Reaction } = req.body;
    try {
        await Message.removeReaction(parseInt(message_id), String(Reaction));

        res.status(200).json({
            msg: "Reacción eliminada correctamente",
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar la reacción del mensaje"
        });
    }
}

export async function getMessagesReaction(req, res) {
    const { message_id } = req.params;
    try {
        const reactions = await Message.GetMessagesReaction(parseInt(message_id));
        res.status(200).json({
            ok: true,
            reactions: reactions
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener las reacciones del mensaje"
        });
    }
}
