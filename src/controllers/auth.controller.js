// Importart paquetes de NODE
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

// Importar modelos POO
import User from "../models/user.model.js";
import Auth from "../models/auth.model.js";

// Importar funciones para autenticacion

// Registro de usuario
export const userRegister = async (req, res) => {

    // REVISAR SI EL USUARIO EXISTE
    const q = await Auth.validateUserAlreadyExists(req.body.email)
    console.log(q)
    // SI EL USUARIO EXISTE, ENVIAR ERROR

    if (q) {
        return res.status(400).json({
            ok: false,
            msg: 'Un usuario ya existe con ese email'
        })
    }

    // Comenzar a crear el usuario

        // Hashear el password     
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

        // Crear el usuario en la base de datos
        try {
            User.createUser(                
                req.body.thumbnail,
                req.body.phone_number,
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                hashedPassword,
                req.body.gender,
                req.body.type
            )

            console.log('Usuario creado correctamente')

            return res.status(201).json({
                ok: true,
                msg: 'Usuario creado correctamente'
            })
        }  catch (error) {

            console.log(error)

            return res.status(500).json({
                ok: false,
                msg: 'El usuario no pudo ser creado a pesar de no existir, contacte al administrador'
            })
        }

        // Crear y firmar el JWT
        
        // Enviar el JWT

}

// Login de usuario
export const userLogin = async (req, res) => {
    const q = await Auth.findUser(req.body.email)

    // Si el usuario existe, validar la contraseña
    if (q) {
        // Validar la contraseña del usuario con ese correo y la que envio en el login.
        const validPassword = bcryptjs.compareSync(req.body.password, q.password);
        // Si la contraseña es incorrecta, enviar error
        if (!validPassword) return res.status(400).json({ ok: false, msg: 'Contraseña o email incorrectos'});
    
        // Crear y firmar el JWT
        const token = jwt.sign({id: q.user_id}, "secret_key");
    
        const { password, ...others} = q;
    
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(others)
    
        } else { // Si el usuario no existe, enviar error
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        });
    }
}

// Cerrar sesión de usuario
export const userLogout = async (req, res) => {
    res.clearCookie("accces_token", {
        secure: true,
        sameSite: "none"
    }).status(200).json({
        ok: true,
        msg: 'Sesión cerrada correctamente'
    });
}
