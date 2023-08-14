// importar response de express, para tener el tipado de la respuesta de la petición.
import Comment from "../models/comment.model.js";

// Funcion para obtener un comentario por Id

export async function commentGet(req, res) {
    try {
        const id = parseInt(req.params.comment_id);
        const comment = await Comment.readCommentById(id);
        res.status(200).json({
        msg: "Comentario obtenido correctamente",
        ok: true,
        comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al obtener el comentario"
        });
    }
}

// Funcion para obtener todos los comentarios de un post

export async function commentGetAll(req, res) {
    try {
        const postId = parseInt(req.params.comment_post_id);
        const comments = await Comment.readAllCommentsBycomment_post_id(postId);
        res.status(200).json({
        msg: "Comentarios obtenidos correctamente",
        ok: true,
        comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al obtener los comentarios del post"
        });
    }
}

// Funcion para crear un comentario

export async function commentPost(req, res) {
    const comment_post_id = parseInt(req.params.comment_post_id);
    const comment_user_id = parseInt(req.params.comment_user_id);

    try {
        const comment = await Comment.createComment(
        comment_user_id,
        comment_post_id,
        req.body.text
        );
        res.status(200).json({
        msg: "Comentario creado correctamente",
        ok: true,
        comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al crear el comentario"
        });
    }
}

// Funcion para actualizar un comentario

export async function commentPut(req, res) {
    try {
        const id = parseInt(req.params.comment_id);
        const comment = await Comment.updateComment(
        id,
        req.body.text
        );
        res.status(200).json({
        msg: "Comentario actualizado correctamente",
        ok: true,
        comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al actualizar el comentario"
        });
    }
}

// Funcion para eliminar un comentario

export async function commentDelete(req, res) {
    try {
        const id = parseInt(req.params.comment_id);
        const comment = await Comment.deleteComment(id);
        res.status(200).json({
        msg: "Comentario eliminado correctamente",
        ok: true,
        comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al eliminar el comentario"
        });
    }
}
