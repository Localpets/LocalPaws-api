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
    const id = req.params.id;
    // Eliminar el usuario en la base de datos
    const user = User.deleteUserById(id);
    // Responder con el usuario eliminado
    res.json({
        msg: 'DELETE API - controlador: Usuario eliminado correctamente',
        user
    })

};