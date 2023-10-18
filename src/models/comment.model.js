// Importar PrismaClient para poder hacer consultas a la base de datos
import { PrismaClient } from "@prisma/client";

// Crear una nueva instancia de PrismaClient
const prisma = new PrismaClient();

// Crear la clase Comment, que se encargará de manejar los comentarios de los usuarios
class Comment {
    constructor() {
        this.comment_user_id = comment_user_id;
        this.comment_post_id = comment_post_id;
        this.text = content;
    }

    // Métodos para crear, leer, actualizar y eliminar comentarios
    static async createComment(comment_user_id, comment_post_id, parent_comment_id = null, content) {
        const res =  await prisma.PostComment.create({
            data: {
                comment_user_id: comment_user_id,
                comment_post_id: comment_post_id,
                parent_comment_id: parent_comment_id,
                text: content
            }
        });

        // find user comment info 
        const user = await prisma.User.findUnique({
            where: {
                user_id: comment_user_id
            }
        });

        // return comment with user info

        return {
            comment_id: res.comment_id,
            comment_user_id: res.comment_user_id,
            comment_post_id: res.comment_post_id,
            parent_comment_id: res.parent_comment_id,
            text: res.text,
            user: {
                user_id: user.user_id,
                username: user.username,
                avatar: user.thumbnail
            }
        }
    }
    // Funcion para obtener un comentario por su id
    static async readCommentById(comment_id) {
        return await prisma.PostComment.findUnique({
            where: {
                comment_id: comment_id
            }
        });
    }

    //Get comments by Parent Comment Id
    static async getCommentsByParentCommentId(parent_comment_id) {
        const commentsRes = await prisma.postComment.findMany({
            where: {
                parent_comment_id: parent_comment_id,
            }
        });

        // Get user info for each comment
        const comments = await Promise.all(commentsRes.map(async (comment) => {
            const user = await prisma.user.findUnique({
                where: {
                    user_id: comment.comment_user_id
                }
            });

            return {
                comment_id: comment.comment_id,
                comment_user_id: comment.comment_user_id,
                comment_post_id: comment.comment_post_id,
                parent_comment_id: comment.parent_comment_id,
                text: comment.text,
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    avatar: user.thumbnail
                }
            }
        }));

        return comments;
    }

    // Funcion para obtener todos los comentarios de un post
    static async readAllCommentsBycomment_post_id(comment_post_id) {
        const post = await prisma.post.findUnique({
            where: {
                post_id: comment_post_id
            }
        });
    
        if (!post) {
            return null; // Devuelve null si el comment_post_id no existe.
        }

        const res = await prisma.postComment.findMany({
            where: {
                comment_post_id: comment_post_id,
                parent_comment_id: null
            }
        });

        // Get user info for each comment
        const comments = await Promise.all(res.map(async (comment) => {
            const user = await prisma.user.findUnique({
                where: {
                    user_id: comment.comment_user_id
                }
            });

        const children = await this.getCommentsByParentCommentId(comment.comment_id);

            return {
                comment_id: comment.comment_id,
                comment_user_id: comment.comment_user_id,
                comment_post_id: comment.comment_post_id,
                parent_comment_id: comment.parent_comment_id,
                text: comment.text,
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    avatar: user.thumbnail
                },
                children: children ? children : []
            }
        }));

        return comments;
    
    }
    // Funcion para actualizar un comentario
    static async updateComment(comment_id, content) {
        return await prisma.PostComment.update({
            where: {
                comment_id: comment_id
            },
            data: {
                text: content,
                updatedAt: new Date()
            }
        });
    }
    // Funcion para eliminar un comentario
    static async deleteComment(comment_id) {
        return await prisma.PostComment.delete({
            where: {
                comment_id: comment_id
            }
        });
    }

    // Funcion para likear comments
    static async likeComment(comment_id, user_id, type) {
        return await prisma.postCommentLike.create({
            data: {
                like_type: type,
                comment_id: comment_id,
                user_id: user_id
            }
        });
    }

    // Funcion para obtener likes de un comment
    static async getLikes(comment_id) {
        return await prisma.postCommentLike.findMany({
            where: {
                comment_id: comment_id
            }
        });
    }

    // Funcion para borrar Like de un comment por ID
    static async deleteLikeByCommentId(comment_id, user_id) {
        return await prisma.postCommentLike.deleteMany({
            where: {
                comment_id: comment_id,
                user_id: user_id
            }
        });
    }

    // Funcion para update el type de un like
    static async updateLikeType(comment_id, like_id, user_id, like_type) {
        return await prisma.postCommentLike.update({
            where: {
                like_id: like_id,
                comment_id: comment_id,
                user_id: user_id
            },
            data: {
                like_type: like_type
            }
        });
    }
}

export default Comment;