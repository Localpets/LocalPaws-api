import { Router } from "express";
import { 
    createLocation, 
    updateLocation,
    readAllLocations,
    getLocationById,
    deleteLocationById,
    createLocationType,
    readAllLocationTypes,
    getLocationTypeById,
    deleteLocationTypeById,
    readAllLocationsByType,
    readAllLocationsByUser,
    createLocationPhoto,
    readAllLocationPhotos,
    deleteLocationPhotoById,
    createLocationReview,
    readAllLocationReviews,
    getLocationReviewById,
    updateLocationReviewById
} from '../controllers/location.controller.js';

// Importar metodos de verificacion de tokens
import verifyToken from '../middlewares/authUserJWT.js';

const locationRouter = Router();

// CRUD de ubicaciones
locationRouter.post('/create', verifyToken, createLocation);
locationRouter.put('/update/:id', verifyToken, updateLocation);
locationRouter.get('/find/all', verifyToken, readAllLocations);
locationRouter.get('/find/id/:id', verifyToken, getLocationById);
locationRouter.delete('/delete/:id', verifyToken, deleteLocationById);
locationRouter.get('/find/type/:type', verifyToken, readAllLocationsByType);
locationRouter.get('/find/user/:userId', verifyToken, readAllLocationsByUser);

// CRUD de tipos de ubicación
locationRouter.post('/type/create', verifyToken, createLocationType);
locationRouter.get('/type/find/all', verifyToken, readAllLocationTypes);
locationRouter.get('/type/find/id/:id', verifyToken, getLocationTypeById);
locationRouter.delete('/type/delete/:id', verifyToken, deleteLocationTypeById);

// CRUD de fotos de ubicación
locationRouter.post('/photo/create', verifyToken, createLocationPhoto);
locationRouter.get('/photo/find/:id', verifyToken, readAllLocationPhotos);
locationRouter.delete('/photo/delete/:id', verifyToken, deleteLocationPhotoById);

// CRUD de reseñas de ubicación
locationRouter.post('/review/create', verifyToken, createLocationReview);
locationRouter.get('/review/find/all', verifyToken, readAllLocationReviews);
locationRouter.get('/review/find/:id', verifyToken, getLocationReviewById);
locationRouter.put('/review/update/:id', verifyToken, updateLocationReviewById);


export default locationRouter;