// importar el modelo de follow
import Follow from '../models/follow.model.js';

// Crear un nuevo follow
export const createFollow = async (req, res) => {
    try {
        const followerId = parseInt(req.body.followerId);
        const followedId = parseInt(req.body.followedId);
        const follow = await Follow.startFollowing(followerId, followedId);
        res.status(201).json({
            msg: 'POST API - controlador: Crear un nuevo follow',
            follow
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un follow por Id
export const readFollowById = async (req, res) => {
    try {
        const id = parseInt(req.params.follow_id);
        const follow = await Follow.getFollowById(id);
        res.status(200).json({
            msg: 'GET API - controlador: Obtener un follow por Id',
            follow
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener todos los follows de un usuario
export const readAllFollowsByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.followerId);
        const follows = await Follow.getFollowsByUserId(userId);
        res.status(200).json({
            msg: 'GET API - controlador: Todos los follows de un usuario',
            follows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener todos los follows de un usuario
export const readAllFollowsByFollowedId = async (req, res) => {
    try {
        const userId = parseInt(req.params.followedId);
        const follows = await Follow.getFollowersByUserId(userId);
        res.status(200).json({
            msg: 'GET API - controlador: Todos los follows de un usuario',
            follows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// detener un follow
export const deleteFollow = async (req, res) => {
    try {
        const followerId = parseInt(req.params.followerId);
        const followedId = parseInt(req.params.followedId);
        const follow = await Follow.stopFollowing(followerId, followedId);
        res.status(200).json({
            msg: 'DELETE API - controlador: Eliminado un follow',
            follow
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

