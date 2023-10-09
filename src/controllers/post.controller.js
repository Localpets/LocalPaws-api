// Importar response de express para tener autocompletado
import { response } from "express";
import fs from "fs";
import multer from "multer";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
// importar el modelo de POSTS
import Post from "../models/post.model.js";

// Configura Multer para subir archivos
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: join(__dirname, `../uploads/assets/postImage/${Date.now()}`),
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // Límite de tamaño de archivo (5 MB en este caso)
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido'));
    }
  }
}).single('image'); // Nombre del campo en el formulario

// crear un nuevo post
export async function createPost(req, res = response) {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({
            ok: false,
            msg: err.message
          });
        }
        
        // validar si viene la imagen
        if (!req.file) {    
          const { text, category } = req.body;
          const post_user_id = parseInt(req.body.post_user_id);
          // Crear el post con la URL de la imagen de Cloudinary
          const post = await Post.createPost(text, category, null, post_user_id);

          return res.status(201).json({
            msg: 'Post creado correctamente',
            ok: true,
            post
          });
        }

        const { text, category } = req.body;
        const post_user_id = parseInt(req.body.post_user_id);

        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `postImages/user:${post_user_id}`,
          resource_type: 'image',
          public_id: `date-${Date.now()}`,
          overwrite: true,
        });

        // Crear el post con la URL de la imagen de Cloudinary
        const post = await Post.createPost(text, category, result.secure_url, post_user_id);
  
        if (!post) {
          return res.status(400).json({
            ok: false,
            msg: 'No se pudo crear el post'
          });
        }
  
        return res.status(201).json({
          msg: 'Post creado correctamente',
          ok: true,
          post
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: 'Error interno del servidor'
      });
    }
}

// obtener todos los posts
export async function getAllPosts(req, res = response) {
  try {
    const posts = await Post.getAllPosts();
    return res.status(200).json({
      msg: "Posts obtenidos correctamente",
      ok: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// obtener un post por Id
export async function getPostById(req, res = response) {
  const id = parseInt(req.params.id);
  try {
    const post = await Post.getPostById(id);
    return res.status(200).json({
      msg: "Post obtenido correctamente por id",
      ok: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// obtener todos los posts de un usuario
export async function getPostsByUserId(req, res = response) {
  const userId = parseInt(req.params.userId);
  try {
    const posts = await Post.getPostsByUserId(userId);
    return res.status(200).json({
      msg: "Posts obtenidos correctamente por id de usuario",
      ok: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// actualizar un post
export async function updatePost(req, res = response) {
  const post_id = parseInt(req.params.post_id);
  const post_user_id = parseInt(req.params.post_user_id);
  const { text } = req.body;

  try {
    const post = await Post.updatePost(
      post_id,
      text,
      post_user_id
    );
    return res.status(200).json({
      msg: "Post actualizado correctamente",
      ok: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// eliminar un post
export async function deletePost(req, res = response) {
  const id = parseInt(req.params.id);
  try {
    const post = await Post.deletePost(id);
    // delete folder on cloudinary
    const folder = post.image.split("/")[6];
    await cloudinary.api.delete_folder(folder);

    // delete server folder
    const path = post.image.split("/")[7];
    console.log(path);
    fs.unlinkSync(`./uploads/assets/postImage/${path}`);

    return res.status(200).json({
      msg: "Post eliminado correctamente",
      ok: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// obtener posts por follows de user
export async function getPostsByFollows(req, res = response) {
  const userId = parseInt(req.params.userId);
    
  if (!userId) {
    return 
  } else {
    try {
      const posts = await Post.getPostsByFollows(userId);
      return res.status(200).json({
        msg: "Posts obtenidos correctamente por follows de usuario",
        ok: true,
        posts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Error interno del servidor",
      });
    }
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
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// crear categoria de un post
export async function createPostCategory(req, res = response) {
  const { category } = req.body;
  try {
    const post = await Post.createCategory(category);
    return res.status(201).json({
      msg: "Categoria de post creada correctamente",
      ok: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}

// obtener todas las categorias
export async function getAllCategories(req, res = response) {
  try {
    const categories = await Post.getAllCategories();
    return res.status(200).json({
      msg: "Categorias obtenidas correctamente",
      ok: true,
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
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
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
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
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
}
