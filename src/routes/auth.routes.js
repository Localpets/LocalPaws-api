import { Router } from "express";
import { 
    userLogin, 
    userRegister, 
    userLogout
} from '../controllers/auth.controller.js';

// Verificar token de usuario admin
import verifyToken from "../middlewares/authJWT.js";


const authRouter = Router();

authRouter.post('/login', verifyToken, userLogin);
authRouter.post('/register', verifyToken, userRegister);
authRouter.post('/logout', verifyToken, userLogout);

export default authRouter;