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
    static async createMessage(sender_id, receiver_id, text, image_url, room, replies) {
        return await prisma.message.create({
        data: {
            sender_id,
            receiver_id,
            text,
            image_url,
            room,
            replies
        },
        });
    }

    static async getMessageById(messageId) {
        return prisma.message.findUnique({
            where: {
                id: messageId
            }
        });
    }
    
    
    static async createMessageReply({ text, image_url, senderId, parentMessageId, replyMessageId }) {
            return await prisma.messageReply.create({
                data: {
                    text,
                    image_url,
                    senderId,
                    parentMessage: {
                        connect: { id: parentMessageId }
                    },
                    replyMessageId
                },
            });
    }

    static async getResponsesByMessageId(messageId) {
        try {
            // Busca el mensaje al que estás respondiendo
            const replyMessageId = await prisma.message.findUnique({
                where: { id: messageId },
            });
    
            if (!replyMessageId) {
                return null;
            }
    
            // Busca todas las respuestas que coincidan con el parentMessageId
            const responses = await prisma.messageReply.findMany({
                where: { replyMessageId: replyMessageId.id },
            });
    
            return responses;
        } catch (error) {
            throw error;
        }
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
          where: { id: messageId },
        });
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

    static async createMessageStatus({ user_id, message_id, is_deleted, is_read }) {
        return await prisma.messageStatus.create({
          data: {
            user_id,
            message_id,
            is_deleted,
            is_read,
          },
        });
      }
      

      static async deleteMessageStatus(messageId) {
        return await prisma.messageStatus.deleteMany({
          where: { message_id: messageId },
        });
      }
      

    static async GetAllMessagesStatus() {
        return prisma.messageStatus.findMany(); 
    }

    static async getMessageStatus(userId, messageId) {
        return prisma.messageStatus.findFirst({
            where: {
                user_id: userId,
                message_id: messageId
            }
        });
    }

    static async getUnreadMessagesStatus(userId) {
        return prisma.messageStatus.findMany({
            where: {
                user_id: userId,
                is_read: 0
            }
        })
    }

    static async MarkAsReadMessageStatus(messageStatusId, is_read) {
        return await prisma.messageStatus.update({
            where: { id: messageStatusId },
            data: { is_read: 1 }
        });
    }

    static async MarkAsDeletedMessageStatus(messageStatusId, is_deleted) {
        return await prisma.messageStatus.update({
            where: { id: messageStatusId },
            data: { is_deleted: 1 }
        });
    }
    
}
export default Message;