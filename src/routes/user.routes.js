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
    userGenderDelete as deleteUserGenreById,
    userChangeProfileInfo
} from '../controllers/user.controller.js';

// Importar metodos de verificacion de tokens
import verifyToken from '../middlewares/authAdminJWT.js';

const userRouter = Router();
// CRUD de usuarios
userRouter.get('/find/id/:user_id', verifyToken, userGetById);
userRouter.get('/find/mail/:email', verifyToken, userGetByEmail);
userRouter.get('/find/all', verifyToken, userGetAll);
userRouter.put('/update/:user_id', verifyToken, userUpdate);
userRouter.delete('/delete/:user_id', verifyToken, userDelete);
userRouter.put('/update/profile-info/:user_id', verifyToken, userChangeProfileInfo);

// CRUD de tipos de usuario
userRouter.post('/type/create', verifyToken, createUserType);
userRouter.get('/type/find/all', verifyToken, readAllUserTypes);
userRouter.get('/type/find/id/:id', verifyToken, getUserTypeById);
userRouter.delete('/type/delete/:id', verifyToken, deleteUserTypeById);

// CRUD de generos de usuario
userRouter.post('/genre/create', verifyToken, createUserGenre);
userRouter.get('/genre/find/all', verifyToken, readAllUserGenres);
userRouter.get('/genre/find/id/:id', verifyToken, getUserGenreById);
userRouter.delete('/genre/delete/:id', verifyToken, deleteUserGenreById);

export default userRouter;
