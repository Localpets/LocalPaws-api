// Importar PrismaClient para poder hacer consultas a la base de datos
import { PrismaClient } from "@prisma/client";

// Crear una nueva instancia de PrismaClient
const prisma = new PrismaClient();

// Crear la clase Message, que se encargará de manejar los mensajes de los usuarios
class Message {
    constructor(sender_id, receiver_id, content) {
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.text = content;
    }

// Métodos para crear, leer, actualizar y eliminar comentarios
    static async createMessage(sender_id, receiver_id, content, room) {
        return await prisma.message.create({
            data: {
                sender_id,
                receiver_id,
                text: content,
                room: room
            }
        })
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
        return await prisma.message.update({
            where: { id: messageId },
            data: { text: newText, edited: edited }
        })
    }

    static async deleteMessage(messageId) {
        return await prisma.message.delete({
            where: { id: messageId }
        })
    }

    static async addReaction(messageId, userId, reaction) {
        return await prisma.message_like.create({
            data: {
                message_id: messageId,
                user_id: userId,
                Reaction: reaction
            }
        })
    }

    static async GetMessagesReaction(messageId) {
        return  prisma.message_like.findMany({
            where: { message_id: messageId }
        })
    }
    
    static async removeReaction(id) {
        await prisma.message_like.delete({
            where: { id: id }
        });
    }    
    


    static async GetAllMessagesReaction() {
        return prisma.message_like.findMany(); 
    }
}
export default Message;