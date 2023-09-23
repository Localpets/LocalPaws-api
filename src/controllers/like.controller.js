// importar response de express, para tener el tipado de la respuesta de la petición.
import { response } from "express";

// importar el modelo de like
import Like from "../models/like.model.js";

// realizar las funciones para likes

// Crear un nuevo like
const createLike = async (req, res = response) => {
    try {
        const { like_type } = req.body;
        const user_id = parseInt(req.body.user_id);
        const post_id = parseInt(req.body.post_id);

        const newLike = await Like.createLike(like_type, user_id, post_id);
        res.status(201).json({
            ok: true,
            msg: 'Like creado correctamente',
            newLike
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el like'
        });
    }
};

// Obtener un like por Id
const readLikeById = async (req, res = response) => {
    try {
        const { like_id } = parseInt(req.params);
        const like = await Like.readLikeById(like_id);
        res.status(200).json({
            ok: true,
            msg: 'Like obtenido correctamente',
            like
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el like'
        });
    }
}

// Obtener todos los likes de un usuario
const readAllLikesByUserId = async (req, res = response) => {
    try {
        const { user_id } = parseInt(req.params);
        const likes = await Like.readAllLikesByUserId(user_id);
        res.status(200).json({
            ok: true,
            msg: 'Likes obtenidos correctamente',
            likes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los likes'
        });
    }
}

// Obtener todos los likes de un post
const readAllLikesByPostId = async (req, res = response) => {
    try {
        const post_id = parseInt(req.params.post_id);
        const likes = await Like.readAllLikesByPostId(post_id);
        res.status(200).json({
            ok: true,
            msg: 'Likes obtenidos correctamente',
            likes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los likes'
        });
    }
}

// Eliminar un like
const deleteLike = async (req, res = response) => {
    // '/delete/:post_id/:user_id'
    try {
        const { post_id, user_id } = req.params;
        const deletedLike = await Like.deleteLikeById(post_id, user_id);
        res.status(200).json({
            ok: true,
            msg: 'Like eliminado correctamente',
            deletedLike
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el like'
        });
    }
}

// Actualizar un like
const updateLikeById = async (req, res = response) => {
    try {
        const { like_id } = req.params;
        const { like_type } = req.body;
        const updatedLike = await Like.updateLikeById(like_id, like_type);
        res.status(200).json({
            ok: true,
            msg: 'Like actualizado correctamente',
            updatedLike
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el like'
        });
    }
}

// exportar las funciones de like
export {
    createLike,
    readLikeById,
    readAllLikesByUserId,
    readAllLikesByPostId,
    deleteLike,
    updateLikeById
}