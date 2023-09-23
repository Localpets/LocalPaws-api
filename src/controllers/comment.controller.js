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
    const comment_post_id = parseInt(req.body.comment_post_id);
    const comment_user_id = parseInt(req.body.comment_user_id);
    const parent_comment_id = req.body.parent_comment_id;

    try {
        const comment = await Comment.createComment(
        comment_user_id,
        comment_post_id,
        parent_comment_id,
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

// Funcion para likear comments
export async function commentLike(req, res) {
    try {
        const comment_id = parseInt(req.params.comment_id);
        const user_id = parseInt(req.body.user_id);
        const type = req.body.type;
        const like = await Comment.likeComment(comment_id, user_id, type);
        res.status(200).json({
        msg: "Like creado correctamente",
        ok: true,
        like
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al crear el like"
        });
    }
}

// Funcion para obtener likes de un comment
export async function commentGetLikes(req, res) {
    try {
        const comment_id = parseInt(req.params.comment_id);
        const likes = await Comment.getLikes(comment_id);
        res.status(200).json({
        msg: "Likes obtenidos correctamente",
        ok: true,
        likes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al obtener los likes del comentario"
        });
    }
}

// Funcion para borrar Like de un comment por ID
export async function commentDeleteLike(req, res) {
    try {
        const comment_id = parseInt(req.params.comment_id);
        const user_id = parseInt(req.params.user_id);
        console.log(comment_id, user_id)
        
        const like = await Comment.deleteLikeByCommentId(comment_id, user_id);
        res.status(200).json({
        msg: "Like eliminado correctamente",
        ok: true,
        like
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al eliminar el like del comentario"
        });
    }
}

// Funcion para update el type de un like
export async function commentUpdateLike(req, res) {
    try {
        const comment_id = parseInt(req.params.comment_id);
        const user_id = parseInt(req.body.user_id);
        const like_id = parseInt(req.body.like_id);
        const like_type = req.body.like_type;
        console.log({
            comment_id,
            user_id,
            like_id,
            like_type
        })
        
        const like = await Comment.updateLikeType(comment_id, like_id, user_id, like_type);
        res.status(200).json({
        msg: "Like actualizado correctamente",
        ok: true,
        like
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error al actualizar el like del comentario"
        });
    }
}
