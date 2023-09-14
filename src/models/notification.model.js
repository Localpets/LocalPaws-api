import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Notification {
    constructor() {}

    static async createNotification(user_id, user_received_id, text, type) {
        return await prisma.notification.create({
            data: {
                user_id: parseInt(user_id),
                user_received_id: parseInt(user_received_id),
                text: text,
                type: type
            }
        })
    }

    static async getNotificationById(id) {
        return await prisma.notification.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    static async getNotificationsByUserSenderId(user_id) {
        return await prisma.notification.findMany({
            where: {
                user_id: parseInt(user_id)
            }
        });
    }

    static async getNotificationsByUserReceivedId(user_received_id) {        
        const res = await prisma.notification.findMany({
            where: {
                user_received_id: parseInt(user_received_id)
            }
        });
    
        // Use Promise.all to await all async operations
        const data = await Promise.all(res.map(async (notification) => {
            const user = await prisma.user.findUnique({
                where: {
                    user_id: notification.user_id
                }
            });
    
            const { username, first_name, last_name, thumbnail } = user;
    
            const userWithoutPassword = {
                username,
                first_name,
                last_name,
                thumbnail
            };
    
            const notificationWithUser = {
                ...notification,
                user: userWithoutPassword
            };
    
            return {
                ...notificationWithUser
            };
        }));
    
        return data;
    }
    

    static async updateNotificationById(id, notification) {
        return await prisma.notification.update({
            where: {
                id: parseInt(id)
            },
            data: notification
        });
    }

    static async deleteNotificationById(id) {
        return await prisma.notification.delete({
            where: {
                id: parseInt(id)
            }
        });
    }

    static async deleteNotificationsByUserId(user_id) {
        return await prisma.notification.deleteMany({
            where: {
                user_id: parseInt(user_id)
            }
        });
    }
}

export default Notification;