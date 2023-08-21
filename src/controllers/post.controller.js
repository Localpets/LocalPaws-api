// Importar response de express para tener autocompletado
import { response } from "express";
// importar el modelo de POSTS
import Post from "../models/post.model.js";
 
// crear un nuevo post
export async function createPost(req, res = response) {
    const { text, category, image } = req.body;

    const post_user_id = parseInt(req.body.post_user_id)

    try {
        const post = await Post.createPost(text, category, image, post_user_id);

        return res.status(201).json({
            msg: "Post creado correctamente",        
            ok: true,
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

// obtener todos los posts
export async function getAllPosts(req, res = response) {
    try {
        const posts = await Post.getAllPosts();
        return res.status(200).json({
            msg: "Posts obtenidos correctamente",
            ok: true,
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

// obtener un post por Id
export async function getPostById(req, res = response) {
    const id = parseInt(req.params.id);
    try {
        const post = await Post.getPostById(id);
        return res.status(200).json({
            msg: "Post obtenido correctamente por id",
            ok: true,
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

// obtener todos los posts de un usuario
export async function getPostsByUserId(req, res = response) {
    const userId = parseInt(req.params.userId);
    try {
        const posts = await Post.getPostsByUserId(userId);
        return res.status(200).json({
            msg: "Posts obtenidos correctamente por id de usuario",
            ok: true,
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

// actualizar un post
export async function updatePost(req, res = response) {
    const id = parseInt(req.params.id);
    const post_user_id = parseInt(req.params.post_user_id);
    const { text, category, image, likes } = req.body;
    try {
        const post = await Post.updatePost(id, text, category, image, likes, post_user_id);
        return res.status(200).json({
            msg: "Post actualizado correctamente",
            ok: true,
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

// eliminar un post
export async function deletePost(req, res = response) {
    const id = parseInt(req.params.id);
    try {
        const post = await Post.deletePost(id);
        return res.status(200).json({
            msg: "Post eliminado correctamente",
            ok: true,
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

// obtener posts por follows de user
export async function getPostsByFollows(req, res = response) {
    const userId = parseInt(req.params.userId);
    try {
        const posts = await Post.getPostsByFollows(userId);
        return res.status(200).json({
            msg: "Posts obtenidos correctamente por follows de usuario",
            ok: true,
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

// obtener posts por categoria
export async function getPostsByCategory(req, res = response) {
    const category = req.params.category;
    try {
        const posts = await Post.getPostsByCategory(category);
        return res.status(200).json({
            msg: "Posts obtenidos correctamente por categoria",
            ok: true,
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
}

// crear categoria de un post
export async function createPostCategory(req, res = response) {
    const postId = parseInt(req.params.postId);
    const { category } = req.body;
    try {
        const post = await Post.createPostCategory(postId, category);
        return res.status(201).json({
            msg: "Categoria de post creada correctamente",
            ok: true,
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

// obtener todas las categorias
export async function getAllCategories(req, res = response) {
    try {
        const categories = await Post.getAllCategories();
        return res.status(200).json({
            msg: "Categorias obtenidas correctamente",
            ok: true,
            categories
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

// obtener categoria por id
export async function getCategoryById(req, res = response) {
    const id = parseInt(req.params.id);
    try {
        const category = await Post.getCategoryById(id);
        return res.status(200).json({
            msg: "Categoria obtenida correctamente por id",
            ok: true,
            category
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}

// borrar categoria por id
export async function deleteCategory(req, res = response) {
    const id = parseInt(req.params.id);
    try {
        const category = await Post.deleteCategory(id);
        return res.status(200).json({
            msg: "Categoria eliminada correctamente",
            ok: true,
            category
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        })
    }
}
