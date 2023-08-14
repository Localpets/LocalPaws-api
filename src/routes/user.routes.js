import { Router } from "express";
import { 
    userGetById,
    userGetByEmail,
    userGetAll,
    userUpdate, 
    userDelete, 
    } from '../controllers/user.controller.js';


const userRouter = Router();

userRouter.get('/find/id/:user_id', userGetById);
userRouter.get('/find/mail/:email', userGetByEmail);
userRouter.get('/find/all', userGetAll);
userRouter.put('/update/:user_id', userUpdate);
userRouter.delete('/delete/:user_id', userDelete);

export default userRouter;