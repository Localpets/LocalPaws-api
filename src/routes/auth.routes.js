import { Router } from "express";
import { 
    userLogin, 
    userRegister, 
    userLogout
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', userLogin);
authRouter.post('/register', userRegister);
authRouter.post('/logout', userLogout);

export default authRouter;