// importar response de express, para tener el tipado de la respuesta de la petición.
import { response } from "express";

// importar modelo de usuario para crear usuarios en la base de datos.
import User from "../models/user.model.js";

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
        data: user
    })

}

// Actualizar usuario por Id
export const userUpdate = (req, res = response) => {
    // Obtener el ID de la URL
    const id = req.params.id;
    // Obtener los datos del body
    const { fist_name, last_name, email, username, password, role } = req.body;
    // Actualizar el usuario en la base de datos
    const user = User.updateUser(id, { fist_name, last_name, email, username, password, role });
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
