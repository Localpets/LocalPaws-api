// import prismaClient
import { PrismaClient } from "@prisma/client";
// create new instance of prismaClient
const prisma = new PrismaClient();

class Follow {
    constructor(followerId, followedId) {
        this.followerId = followerId;
        this.followedId = followedId;
    }

    static async startFollowing(followerId, followedId) {
        return await prisma.follow.create({
            data: {
                followerId: followerId,
                followedId: followedId
            }
        });
    }

    static async stopFollowing(followerId, followedId) {
        return await prisma.follow.deleteMany({
            where: {
                followerId: followerId,
                followedId: followedId
            }
        });
    }
    
    

    static async getFollowersByUserId(userId) {
        const res = await prisma.follow.findMany({
            where: {
                followerId: userId
            }
        });
    
        const resUsersIds = res.map((follow) => {
            return follow.followedId;
        });
    
        const usersInfo = await prisma.user.findMany({
            where: {
                user_id: {
                    in: resUsersIds
                }
            }
        });
    
        // Create a new array with properties removed
        const usersWithoutPassword = usersInfo.map((user) => {
            const {
                user_id,
                username,
                first_name,
                last_name,
                thumbnail
            } = user;
    
            return {
                user_id,
                username,
                first_name,
                last_name,
                thumbnail
            };
        });
    
        return usersWithoutPassword;
    }
    

    static async getFollowedUsersByUserId(userId) {
        return await prisma.follow.findMany({
            where: {
                followerId: userId
            }
        });
    }

    static async getFollowersCountByUserId(userId) {
        return await prisma.follow.count({
            where: {
                followedId: userId
            }
        });
    }

    static async getFollowedUsersCountByUserId(userId) {
        return await prisma.follow.count({
            where: {
                followerId: userId
            }
        });
    }
}

export default Follow;
