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
    updateLocationReviewById
} from '../controllers/location.controller.js';


const locationRouter = Router();

// CRUD de ubicaciones
locationRouter.post('/create', createLocation);
locationRouter.put('/update/:id', updateLocation);
locationRouter.get('/find/all', readAllLocations);
locationRouter.get('/find/id/:id', getLocationById);
locationRouter.delete('/delete/:id', deleteLocationById);
locationRouter.get('/find/type/:type', readAllLocationsByType);
locationRouter.get('/find/user/:userId', readAllLocationsByUser);

// CRUD de tipos de ubicación
locationRouter.post('/type/create', createLocationType);
locationRouter.get('/type/find/all', readAllLocationTypes);
locationRouter.get('/type/find/id/:id', getLocationTypeById);
locationRouter.delete('/type/delete/:id', deleteLocationTypeById);

// CRUD de fotos de ubicación
locationRouter.post('/photo/create', createLocationPhoto);
locationRouter.get('/photo/find/all', readAllLocationPhotos);
locationRouter.delete('/photo/delete/:id', deleteLocationPhotoById);

// CRUD de reseñas de ubicación
locationRouter.post('/review/create', createLocationReview);
locationRouter.get('/review/find/all', readAllLocationReviews);
locationRouter.put('/review/update/:id', updateLocationReviewById);


export default locationRouter;