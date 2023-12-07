// Importart paquetes de NODE
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import multer from "multer";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Importar modelos POO
import User from "../models/user.model.js";
import Auth from "../models/auth.model.js";
import { createUserAuthLocation, updateUserLocation } from './location.controller.js';
import Location from '../models/location.model.js';

// Configura Multer para subir archivos
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userFolderPath = join(__dirname, `../uploads/assets/LocationsImage`);
  
      // Crea la carpeta del usuario si no existe
      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true });
      }
  
      cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const fileName = `${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, fileName);
    }
  });
  

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido'));
    }
  }
}).array('image');


dotenv.config();

// Registro de usuario
export const userRegister = async (req, res) => {
  // Utilizar multer para manejar las imágenes
  upload(req, res, async (err) => {
      if (err) {
          console.error(err);
          return res.status(400).json({
              ok: false,
              msg: err.message
          });
      }

      try {
          // Validar si el usuario ya existe con el correo electrónico
          if (await validateUserExists(req.body.email, res)) {
              return;
          }

          // Validar si ya existe un usuario con el nombre de usuario
          if (await validateUsernameExists(req.body.username, res)) {
              return;
          }

          // Comenzar a crear el usuario
          const { first_name, last_name, phone_number, email, password, gender, type, marketing_accept, username, location } = req.body

          // Hashear el password
          const salt = bcryptjs.genSaltSync(10);
          const hashedPassword = bcryptjs.hashSync(password, salt);

          // location
          const locationRaw = location || 'N/A';

          // Obtener el username
          const usernameNew = '@' + username || email.split('@')[0];

          // Crear el token
          let userToken = 'No token provided';

          // Obtener latitud y longitud de la cadena de ubicación
          const [lat, lng] = locationRaw.split(',').map(coord => coord.trim());

          let createdUser;

          // If the user type is 'MEMBER', create the location
          if (type === 'MEMBER') {
              const { localName, localAddress, localType, localPhone, localSchedule } = req.body;
              const temporaryLocationIdAsNumber = Math.floor(Math.random() * 10000);
              let createdLocation
              const locationData = {
                  name: localName,
                  lat,
                  lng,
                  address: localAddress,
                  type: localType,
                  phone_number: localPhone,
                  schedule: localSchedule,
                  user_created_id: temporaryLocationIdAsNumber
              };

                createdLocation = await createUserAuthLocation({ body: locationData, files: req.files }, res);
                createdUser = await User.createUser(
                  phone_number,
                  first_name,
                  last_name,
                  email,
                  hashedPassword,
                  gender,
                  type,
                  Boolean(marketing_accept),
                  usernameNew,
                  userToken,
                  locationRaw
                );

                await Location.updateUserLocation(createdUser.user_id, createdLocation.location_id)


          } else {
               createdUser = await User.createUser(
                  phone_number,
                  first_name,
                  last_name,
                  email,
                  hashedPassword,
                  gender,
                  type,
                  Boolean(marketing_accept),
                  usernameNew,
                  userToken,
                  locationRaw
              );
          }
          /* return res.status(201).json({
              ok: true,
              msg: 'Usuario creado correctamente',
              token: userToken,
          }); */
      } catch (error) {
          console.log(error);
          // Si hay un error, enviar error 500
          return res.status(500).json({
              ok: false,
              msg: 'Hubo un error en la creación del usuario o la ubicación, contacte al administrador',
          });
      }
  });
};

const validateUsernameExists = async (username, res) => {
  const usernameExists = await Auth.validateUserNameAlreadyExists(username);
  if (usernameExists) {
      res.status(405).json({
          ok: false,
          msg: 'Un usuario ya existe con ese nombre de usuario'
      });
      return true; // Indicate that the validation failed
  }
  return false; // Indicate that the validation was successful
};

const validateUserExists = async (email, res) => {
  const userExists = await Auth.validateUserAlreadyExists(email);
  if (userExists) {
      res.status(400).json({
          ok: false,
          msg: 'Un usuario ya existe con ese correo electrónico'
      });
      return true; // Indicate that the validation failed
  }
  return false; // Indicate that the validation was successful
};

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
    
        res.cookie("access_token", token)
        .status(200)
        .json({
            ok: true,
            msg: 'Login correcto',
            user: others,
            token
        })
    
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
        sameSite: "none"
    }).status(200).json({
        ok: true,
        msg: 'Sesión cerrada correctamente'
    });
}
