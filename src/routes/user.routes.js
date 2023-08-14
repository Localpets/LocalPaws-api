import { Router } from "express";
import { 
    userGetById,
    userGetByEmail,
    userGetAll,
    userUpdate, 
    userDelete, 
    userTypeCreate as createUserType,
    userTypeGetAll as readAllUserTypes,
    userTypeGetById as getUserTypeById,
    userTypeDelete as deleteUserTypeById,
    userGenderCreate as createUserGenre,
    userGenderGetAll as readAllUserGenres,
    userGenderGetById as getUserGenreById,
    userGenderDelete as deleteUserGenreById
    } from '../controllers/user.controller.js';


const userRouter = Router();
// CRUD de usuarios
userRouter.get('/find/id/:user_id', userGetById);
userRouter.get('/find/mail/:email', userGetByEmail);
userRouter.get('/find/all', userGetAll);
userRouter.put('/update/:user_id', userUpdate);
userRouter.delete('/delete/:user_id', userDelete);

// CRUD de tipos de usuario
userRouter.post('/type/create', createUserType);
userRouter.get('/type/find/all', readAllUserTypes);
userRouter.get('/type/find/id/:id', getUserTypeById);
userRouter.delete('/type/delete/:id', deleteUserTypeById);

// CRUD de generos de usuario
userRouter.post('/genre/create', createUserGenre);
userRouter.get('/genre/find/all', readAllUserGenres);
userRouter.get('/genre/find/id/:id', getUserGenreById);
userRouter.delete('/genre/delete/:id', deleteUserGenreById);
export default userRouter;