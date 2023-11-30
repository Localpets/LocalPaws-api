// importar cliente de Prisma 
import { PrismaClient } from '@prisma/client';

// instanciar cliente de Prisma
const prisma = new PrismaClient();

// Crear clase likes

class Like {
    constructor(){
        this.like_type = like_type;
        this.user_id = user_id;
        this.post_id = post_id;
    }

    // Crear un nuevo like
    static async createLike(like_type, user_id, post_id) {
        try {
            const newLike = await prisma.like.create({
                data: {
                    like_type,
                    user_id,
                    post_id
                }
            });
            return newLike;
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener un like por Id
    static async readLikeById(like_id) {
        try {
            const like = await prisma.like.findUnique({
                where: {
                    like_id: parseInt(like_id)
                }
            });
            return like;
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener todos los likes de un usuario
    static async readAllLikesByUserId(user_id) {
        try {
            const likes = await prisma.like.findMany({
                where: {
                    user_id: parseInt(user_id)
                }
            });
            return likes;
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener todos los likes de un post
    static async readAllLikesByPostId(post_id) {
        try {
            const likes = await prisma.like.findMany({
                where: {
                    post_id: parseInt(post_id)
                }
            });
            return likes;
        } catch (error) {
            console.error(error);
        }
    }

    // Actualizar un like
    static async updateLikeById(like_id, like_type) {
        try {
            const updatedLike = await prisma.like.update({
                where: {
                    like_id: parseInt(like_id)
                },
                data: {
                    like_type,
                    updatedAt: new Date()
                }
            });
            return updatedLike;
        } catch (error) {
            console.error(error);
        }
    }

    // Eliminar un like
    static async deleteLikeById(post_id, user_id) {
        // '/delete/:post_id/:user_id'
        try {
            const deletedLike = await prisma.like.deleteMany({
                where: {
                    post_id: parseInt(post_id),
                    user_id: parseInt(user_id)
                }
            });
            return deletedLike;
        } catch (error) {
            console.error(error);
        }
    }

    // Eliminar todos los likes de un usuario

    static async deleteAllLikesByUserId(user_id) {
        try {
            const deletedLikes = await prisma.like.deleteMany({
                where: {
                    user_id: parseInt(user_id)
                }
            });
            return deletedLikes;
        } catch (error) {
            console.error(error);
        }
    }

    // Eliminar todos los likes de un post
    
    static async deleteAllLikesByPostId(post_id) {
        try {
            const deletedLikes = await prisma.like.deleteMany({
                where: {
                    post_id: parseInt(post_id)
                }
            });
            return deletedLikes;
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener todos los likes dados a una persona por su ID post_user_id = user_id con los datos de los usuarios que dieron like
    static async readAllLikesByPostUserId(post_user_id) {
        try {
            const likesWithUserData = [];

            const posts = await prisma.post.findMany({
                where: {
                    post_user_id: parseInt(post_user_id)
                }
            });

            // find likes of that posts

            for (const post of posts) {
                const likes = await prisma.like.findMany({
                    where: {
                        post_id: post.post_id
                    }
                });
                // for each like find user data
                for (const like of likes) {
                    const user = await prisma.user.findUnique({
                        where: {
                            user_id: like.user_id
                        },
                        select: {
                            user_id: true,
                            username: true,
                            email: true,
                            thumbnail: true,
                            type: true
                        }
                    });

                    likesWithUserData.push({
                        post_id: post.post_id,
                        like_id: like.like_id,
                        like_type: like.like_type,
                        like_created_at: like.createdAt,
                        like_updated_at: like.updatedAt,
                        user
                    });
                }
            }

            return likesWithUserData;
        } catch (error) {
            console.error(error);
        }
    }
}

export default Like;