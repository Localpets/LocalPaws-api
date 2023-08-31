import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Notification {
    constructor() {}

    static async createNotification(notification) {
        return await prisma.notification.create({
            user_id,
            text,
            type
        });
    }

    static async getNotificationById(id) {
        return await prisma.notification.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    static async getNotificationsByUserId(user_id) {
        return await prisma.notification.findMany({
            where: {
                user_id: parseInt(user_id)
            }
        });
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