// Importar PrismaClient para poder hacer consultas a la base de datos
import { PrismaClient } from "@prisma/client";

// Importa el cliente de Socket.IO
import { io } from "socket.io-client";


// Crear una nueva instancia de PrismaClient
const prisma = new PrismaClient();

const port = process.env.PORT;
// Crear la clase Message, que se encargará de manejar los mensajes de los usuarios
class Message {
    constructor(sender_id, receiver_id, content) {
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.text = content;
    }

// Métodos para crear, leer, actualizar y eliminar comentarios
    static async createMessage(sender_id, receiver_id, content, room) {
        const message = await prisma.message.create({
            data: {
                sender_id,
                receiver_id,
                text: content,
                room: room
            }
        });

        // Emitir el mensaje a los usuarios correspondientes usando Socket.IO
        const socket = io(`http://localhost:${port}`); // Cambia esto por la URL de tu servidor
        socket.emit('newMessage', message); // 'newMessage' es el evento que escucharán tus clientes

        return message;
    }


    static async getAllMessages() {
        return prisma.message.findMany();
    }

    static async getAllMessagesByUserId(userId) {
        return prisma.message.findMany({
            where: {
                OR: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    static async updateMessage(messageId, newText, edited) {
        const updatedMessage = await prisma.message.update({
            where: { id: messageId },
            data: { text: newText, edited: edited }
        });

        const socket = io(`http://localhost:${port}`);
        socket.emit('messageUpdated', updatedMessage); // Emitir evento 'messageUpdated'

        return updatedMessage;
    }

    static async deleteMessage(messageId) {
        const deletedMessage = await prisma.message.delete({
            where: { id: messageId }
        });

        const socket = io(`http://localhost:${port}`);
        socket.emit('messageDeleted', deletedMessage.id); // Emitir evento 'messageDeleted'

        return deletedMessage;
    }

    static async addReaction(messageId, userId, reaction) {
        const newReaction = await prisma.message_like.create({
            data: {
                message_id: messageId,
                user_id: userId,
                Reaction: reaction
            }
        });

        const socket = io(`http://localhost:${port}`);
        socket.emit('reactionAdded', newReaction); // Emitir evento 'reactionAdded'

        return newReaction;
    }

    static async GetMessagesReaction(messageId) {
        return  prisma.message_like.findMany({
            where: { message_id: messageId }
        })
    }
    
    static async removeReaction(messageId) {
        await prisma.message_like.deleteMany({
            where: { message_id: messageId}
        });

        const socket = io(`http://localhost:${port}`);
        socket.emit('reactionRemoved', { messageId}); // Emitir evento 'reactionRemoved'

        return { messageId};
    }
    
}
export default Message;