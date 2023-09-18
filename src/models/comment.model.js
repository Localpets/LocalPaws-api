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
    // Funcion para obtener todos los comentarios de un post
    static async readAllCommentsBycomment_post_id(comment_post_id) {
        return await prisma.PostComment.findMany({
            where: {
                comment_post_id: comment_post_id
            }
        });
    }
    // Funcion para actualizar un comentario
    static async updateComment(comment_id, content) {
        return await prisma.PostComment.update({
            where: {
                comment_id: comment_id
            },
            data: {
                text: content
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
}

export default Comment;