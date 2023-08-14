// import prismaClient
import { PrismaClient } from "@prisma/client";
// create new instance of prismaClient
const prisma = new PrismaClient();

class Follow {
    constructor(followerId, followedId) {
        this.followerId = followerId;
        this.followedId = followedId;
    }

    static startFollowing(followerId, followedId) {
        return prisma.follow.create({
            data: {
                followerId: followerId,
                followedId: followedId
            }
        });
    }

    static stopFollowing(followerId, followedId) {
        return prisma.follow.delete({
            where: {
                followerId_followedId: {
                    followerId: followerId,
                    followedId: followedId
                }
            }
        });
    }

    static getFollowersByUserId(userId) {
        return prisma.follow.findMany({
            where: {
                followedId: userId
            }
        });
    }

    static getFollowedUsersByUserId(userId) {
        return prisma.follow.findMany({
            where: {
                followerId: userId
            }
        });
    }

    static getFollowersCountByUserId(userId) {
        return prisma.follow.count({
            where: {
                followedId: userId
            }
        });
    }

    static getFollowedUsersCountByUserId(userId) {
        return prisma.follow.count({
            where: {
                followerId: userId
            }
        });
    }
}

export default Follow;
