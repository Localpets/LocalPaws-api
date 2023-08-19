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

// Verificar token de usuario admin
import verifyToken from "../middlewares/authJWT.js";

const postRouter = Router();

// CRUD DE POSTS
// crear un nuevo post
postRouter.post("/create", verifyToken, createPost);
// obtener todos los posts
postRouter.get("/find/all", verifyToken, getAllPosts);
// obtener un post por Id
postRouter.get("/find/id/:id", verifyToken, getPostById);
// obtener todos los posts de un usuario
postRouter.get("/user/:userId", verifyToken, getPostsByUserId);
// actualizar un post
postRouter.put("/update/:id/:post_user_id", verifyToken, updatePost);
// eliminar un post
postRouter.delete("/delete/:id/:post_user_id", verifyToken, deletePost);

// OBTENER POSTS POR CATEGORÍA
// obtener todos los posts de las personas que sigue un usuario
postRouter.get("/find/follows/user/:userId", verifyToken, getPostsByFollows);
// obtener todos los posts de una categoría
postRouter.get("/find/category/:category", verifyToken, getPostsByCategory);

// CRUD DE CATEGORÍAS
// crear una nueva categoría
postRouter.post("/category/create", verifyToken, createPostCategory);
// obtener todas las categorías
postRouter.get("/category/find/all", verifyToken, getAllCategories);
// obtener una categoría por Id
postRouter.get("/category/find/id/:id", verifyToken, getCategoryById);
// eliminar una categoría
postRouter.delete("/category/delete/:id", verifyToken, deleteCategory);

export default postRouter;
