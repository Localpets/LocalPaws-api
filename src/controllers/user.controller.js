// importar response de express, para tener el tipado de la respuesta de la petición.
import { response } from "express";
// importar modelo de usuario para crear usuarios en la base de datos.
import User from "../models/user.model.js";

// Controladores de la API REST de usuarios para registro. 
export const userPost = async (req, res = response) => {
    const body = req.body;

    const user = await User.createUser(body)
    
    res.json({
        msg: 'POST API - controlador',
        user
    })
};

export const userGet = async (req, res = response) => {
    const user = await User.readAllUsers();

    res.json({
        msg: 'GET API - controlador',
        user
    })

};

export const userPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'PUT API - controlador',
        id
    })

};

export const userDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - controlador'
    })

};