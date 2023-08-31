// Importart paquetes de NODE
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Importar modelos POO
import User from "../models/user.model.js";
import Auth from "../models/auth.model.js";

dotenv.config();

// Registro de usuario
export const userRegister = async (req, res) => {

    // REVISAR SI EL USUARIO EXISTE
    const q = await Auth.validateUserAlreadyExists(req.body.email)
    // Revision de username duplicado
    const q2 = await Auth.validateUserNameAlreadyExists(req.body.username)

    // SI EL USUARIO EXISTE, ENVIAR ERROR
    if (q) {
        return res.status(400).json({
            ok: false,
            msg: 'Un usuario ya existe con ese email'
        })
    } else if (q2) {
        return res.status(405).json({
            ok: false,
            msg: 'Un usuario ya existe con ese username'
        })
    }

    // Comenzar a crear el usuario

    // Hashear el password     
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

    // Validar el tipo de usuario
    const type = req.body.type || 'USER'
    // Obtener el username 
    const username = '@' + req.body.username || req.body.email.split('@')[0];
    // Crear el token de usuario y guardarlo en la base de datos con el id del usuario creado si es ADMIN
    let userToken = 'no token provided'; // Inicializar como 'no token provided'

    try {
        // Crear el usuario
        const createdUser = await User.createUser(
            req.body.phone_number,
            req.body.first_name,
            req.body.last_name,
            username,
            req.body.email,
            hashedPassword,
            type,
            req.body.gender,
            userToken,
            req.body.marketing_accept
        );
        // Si el tipo de usuario es ADMIN, guardar el token en la base de datos y actualizar el token del usuario
        if (type === 'ADMIN') {
            // Crear el token
            userToken = jwt.sign({ id: createdUser.user_id }, process.env.SECRET);
            await User.createAdminToken(createdUser.user_id, userToken);
            await User.updateUserToken(createdUser.user_id, userToken);
        }
        // Si el usuario fue creado correctamente, enviar mensaje de éxito
        console.log('Usuario creado correctamente');

        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            token: userToken,
        });
    } catch (error) {
        console.log(error);
        // Si el usuario no pudo ser creado, enviar error 500
        return res.status(500).json({
            ok: false,
            msg: 'El usuario no pudo ser creado a pesar de no existir, contacte al administrador',
        });
    }
}

// Login de usuario
export const userLogin = async (req, res) => {
    const q = await Auth.findUser(req.body.email)

    // Si el usuario existe, validar la contraseña
    if (q) {
        // Validar la contraseña del usuario con ese correo y la que envio en el login.
        const validPassword = bcryptjs.compareSync(req.body.password, q.password);
        // Si la contraseña es incorrecta, enviar error 400
        if (!validPassword) return res.status(400).json({ ok: false, msg: 'Contraseña o email incorrectos'});
    
        // Crear y firmar el JWT
        const token = jwt.sign({id: q.user_id}, "secret_key");
    
        const { password, ...others} = q;
    
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(others)
    
        } else { // Si el usuario no existe, enviar error 403
        return res.status(403).json({
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
