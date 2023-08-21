import { Router } from "express";
import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
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

// Importar metodos de verificacion de tokens
import verifyToken from '../middlewares/authJWT.js';
// Parsear metadata de archivos subidos
const __dirname = dirname(fileURLToPath(import.meta.url));
// Tipos de archivos permitidos
const MIMETYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(__dirname, '../uploads/assets/locationImage'),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.replace(fileExtension, '').toLowerCase().split(' ').join('-') + '-' + Date.now();
            cb(null, fileName + fileExtension);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no permitido (solo .png, .jpg, .jpeg)'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

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
locationRouter.post('/photo/create', verifyToken, multerUpload.single('image'), createLocationPhoto);
locationRouter.get('/photo/find/all', verifyToken, readAllLocationPhotos);
locationRouter.delete('/photo/delete/:id', verifyToken, deleteLocationPhotoById);

// CRUD de reseñas de ubicación
locationRouter.post('/review/create', verifyToken, createLocationReview);
locationRouter.get('/review/find/all', verifyToken, readAllLocationReviews);
locationRouter.put('/review/update/:id', verifyToken, updateLocationReviewById);


export default locationRouter;