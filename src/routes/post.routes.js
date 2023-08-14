import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUserId,
    updatePost,
    deletePost,
    getPostsByFollows,
    getPostsByCategory,
    createPostCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
} from "../controllers/post.controller.js";

const postRouter = Router();

// CRUD DE POSTS
// crear un nuevo post
postRouter.post("/create", createPost);
// obtener todos los posts
postRouter.get("/find/all", getAllPosts);
// obtener un post por Id
postRouter.get("/find/id/:id", getPostById);
// obtener todos los posts de un usuario
postRouter.get("/user/:userId", getPostsByUserId);
// actualizar un post
postRouter.put("/update/:id/:post_user_id", updatePost);
// eliminar un post
postRouter.delete("/delete/:id/:post_user_id", deletePost);

// OBTENER POSTS POR CATEGORÍA
// obtener todos los posts de las personas que sigue un usuario
postRouter.get("/find/follows/user/:userId", getPostsByFollows);
// obtener todos los posts de una categoría
postRouter.get("/find/category/:category", getPostsByCategory);

// CRUD DE CATEGORÍAS
// crear una nueva categoría
postRouter.post("/category/create", createPostCategory);
// obtener todas las categorías
postRouter.get("/category/find/all", getAllCategories);
// obtener una categoría por Id
postRouter.get("/category/find/id/:id", getCategoryById);
// eliminar una categoría
postRouter.delete("/category/delete/:id", deleteCategory);

export default postRouter;
