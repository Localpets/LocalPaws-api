// importar response de express, para tener el tipado de la respuesta de la petición.
import { response } from "express";
import fs from "fs";
import multer from "multer";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
// importar modelo de usuario para crear usuarios en la base de datos.
import User from "../models/user.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: join(__dirname, `../uploads/assets/pfp/${Date.now()}`),
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // Límite de tamaño de archivo (1 MB en este caso)
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido'));
    }
  }
}).single('image'); // Nombre del campo en el formulario

// Controladores de la API REST de usuarios para consultar la base de datos.

// Obtener usuario por ID
export const userGetById = async (req, res = response) => {
    // Obtener el ID de la URL
    const userId = parseInt(req.params.user_id);
    // Buscar el usuario en la base de datos
    const user = await User.getUserById(userId);
    // Responder con el usuario encontrado
    res.json({
        msg: 'GET API - controlador: Usuario encontrado correctamente',
        user
    })

};

// Obtener usuario por correo electrónico
export const userGetByEmail = async (req, res = response) => {
    // Obtener el correo electrónico de la URL
    const userEmail = req.params.email;
    // Buscar el usuario en la base de datos
    const user = await User.getUserByEmail(userEmail);
    // Responder con el usuario encontrado
    res.json({
        msg: 'GET API - controlador: Usuario encontrado correctamente',
        user
    })
};

// Obtener todos los usuarios
export const userGetAll = async (req, res = response) => {
    // Buscar todos los usuarios en la base de datos
    const user = await User.readAllUsers();
    // Responder con los usuarios encontrados
    res.json({
        msg: 'GET API - controlador: Todos los usuarios',
        users: user
    })

}

// Actualizar usuario por Id
export const userUpdate = (req, res = response) => {
    // Obtener el ID de la URL
    const id = parseInt(req.params.user_id);
    // Obtener los datos del body
    const { fist_name, last_name, email, username, gender ,type } = req.body;
    // Actualizar el usuario en la base de datos
    const user = User.updateUser(id, { fist_name, last_name, email, username, gender, type });
    // Responder con el usuario actualizado
    res.json({
        msg: 'PUT API - controlador: Usuario actualizado correctamente',
        user
    })

};

// Eliminar usuario por Id
export const userDelete = (req, res = response) => {
    // Obtener el ID de la URL
    const user_id = parseInt(req.params.user_id);
    console.log(user_id)
    // Eliminar el usuario en la base de datos
    const user = User.deleteUserById(user_id);
    // Responder con el usuario eliminado
    res.json({
        msg: 'DELETE API - controlador: Usuario eliminado correctamente',
        user
    })

};

// Crear tipo de usuario
export const userTypeCreate = (req, res = response) => {
    // Obtener los datos del body
    const { name } = req.body;
    // Crear el tipo de usuario en la base de datos
    const user = User.createUserType({ name });
    // Responder con el tipo de usuario creado
    res.json({
        msg: 'POST API - controlador: Tipo de usuario creado correctamente',
        user
    })
};

// Obtener todos los tipos de usuario
export const userTypeGetAll = async (req, res = response) => {
    // Buscar todos los tipos de usuario en la base de datos
    const user = await User.readAllUserTypes();
    // Responder con los tipos de usuario encontrados
    res.json({
        msg: 'GET API - controlador: Todos los tipos de usuario',
        data: user
    })

};

// Obtener tipo de usuario por Id
export const userTypeGetById = async (req, res = response) => {
    // Obtener el ID de la URL
    const id = parseInt(req.params.id);
    // Buscar el tipo de usuario en la base de datos
    const user = await User.getUserTypeById(id);
    // Responder con el tipo de usuario encontrado
    res.json({
        msg: 'GET API - controlador: Tipo de usuario encontrado correctamente',
        user
    })
}

// Eliminar tipo de usuario por Id
export const userTypeDelete = (req, res = response) => {
    // Obtener el ID de la URL
    const id = parseInt(req.params.id);
    // Eliminar el tipo de usuario en la base de datos
    const user = User.deleteUserTypeById(id);
    // Responder con el tipo de usuario eliminado
    res.json({
        msg: 'DELETE API - controlador: Tipo de usuario eliminado correctamente',
        user
    })

}

// Crear un genero de usuario
export const userGenderCreate = async (req, res = response) => {
    // Obtener los datos del body
    const { name } = req.body;
    // Crear el genero de usuario en la base de datos
    const user = await User.createUserGender({ name });
    // Responder con el genero de usuario creado
    res.json({
        msg: 'POST API - controlador: Genero de usuario creado correctamente',
        user
    })
}

// Obtener todos los generos de usuario
export const userGenderGetAll = async (req, res = response) => {
    // Buscar todos los generos de usuario en la base de datos
    const user = await User.readAllUserGenders();
    // Responder con los generos de usuario encontrados
    res.json({
        msg: 'GET API - controlador: Todos los generos de usuario',
        data: user
    })

}

// Obtener genero de usuario por Id
export const userGenderGetById = async (req, res = response) => {
    // Obtener el ID de la URL
    const id = parseInt(req.params.id);
    // Buscar el genero de usuario en la base de datos
    const user = await User.getUserGenderById(id);
    // Responder con el genero de usuario encontrado
    res.json({
        msg: 'GET API - controlador: Genero de usuario encontrado correctamente',
        user
    })
}

// Eliminar genero de usuario por Id
export const userGenderDelete = async (req, res = response) => {
    // Obtener el ID de la URL
    const id = parseInt(req.params.id);
    // Eliminar el genero de usuario en la base de datos
    const user = await User.deleteUserGenderById(id);
    // Responder con el genero de usuario eliminado
    res.json({
        msg: 'DELETE API - controlador: Genero de usuario eliminado correctamente',
        user
    })

}

export const userChangeProfilePicture = async (req, res = response) => {            
    upload(req, res, async (err) => {
        try {
            if (err) {
                console.error(err);
                return res.status(400).json({
                    ok: false,
                    msg: err.message
                });
            }
            
            // validar si viene la imagen
            if (!req.file) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No se ha enviado ninguna imagen'
                });
            }
    
            // Subir la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
    
            const user_id = parseInt(req.params.user_id);
            // Actualizar el usuario en la base de datos
            const user = await User.changeProfilePicture(user_id, result.secure_url );
    
            if (!user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No se pudo actualizar el usuario'
                });
            }
    
            return res.status(201).json({
                msg: 'Imagen de perfil actualizada correctamente',
                ok: true,
                user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                msg: 'Ocurrió un error interno en el servidor'
            });
        }
    });
}

// export const userChangePassword = async (req, res = response) => {
// }