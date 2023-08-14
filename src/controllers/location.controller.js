// importar response de express, para tener el tipado de la respuesta de la petición.
import { response } from "express";

// importar el modelo de ubicación

import Location from "../models/location.model.js";

export const createLocation = async (req, res = response) => {
    // Extraer el body de la petición
    const { title, lat, lng, address, type, userCreatedId, locationPhotos } =
        req.body;
    
    try {
        // Crear una nueva ubicación
        const location = await Location.createLocation(
        title,
        lat,
        lng,
        address,
        type,
        userCreatedId,
        locationPhotos
        );
    
        // Responder al cliente con la ubicación creada
        res.status(201).json({
        msg: "Ubicación creada correctamente",
        ok: true,
        location,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const updateLocation = async (req, res = response) => {
    // Extraer el body y el ID de la petición
    const id = parseInt(req.params.id);
    const { title, lat, lng, address, type, userCreatedId, locationPhotos } =
        req.body;
    
    try {
        // Actualizar la ubicación
        const location = await Location.updateLocation(id, {
        title,
        lat,
        lng,
        address,
        type,
        userCreatedId,
        locationPhotos,
        });
    
        // Responder al cliente con la ubicación actualizada
        res.status(200).json({
        msg: "Ubicación actualizada correctamente",
        ok: true,
        location,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const readAllLocations = async (req, res = response) => {
    try {
        // Leer todas las ubicaciones
        const locations = await Location.readAllLocations();
    
        // Responder al cliente con las ubicaciones
        res.status(200).json({
        msg: "Ubicaciones obtenidas correctamente",
        ok: true,
        locations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
}

export const getLocationById = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);
    
    try {
        // Leer una ubicación por su ID
        const location = await Location.getLocationById(id);
    
        // Responder al cliente con la ubicación
        res.status(200).json({
        msg: "Ubicación obtenida correctamente",
        ok: true,
        location,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
}

export const deleteLocationById = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);
    
    try {
        // Borrar una ubicación por su ID
        const location = await Location.deleteLocationById(id);
    
        // Responder al cliente con la ubicación borrada
        res.status(200).json({
        msg: "Ubicación borrada correctamente",
        ok: true,
        location,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
}

export const createLocationType = async (req, res = response) => {
    // Extraer el body de la petición
    const { name } = req.body;
    
    try {
        // Crear un nuevo tipo de ubicación
        const locationType = await Location.createLocationType(name);
    
        // Responder al cliente con el tipo de ubicación creado
        res.status(201).json({
        msg: "Tipo de ubicación creado correctamente",
        ok: true,
        locationType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const readAllLocationTypes = async (req, res = response) => {
    try {
        // Leer todos los tipos de ubicación
        const locationTypes = await Location.readAllLocationTypes();
    
        // Responder al cliente con los tipos de ubicación
        res.status(200).json({
        msg: "Tipos de ubicación obtenidos correctamente",
        ok: true,
        locationTypes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const getLocationTypeById = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);
    
    try {
        // Leer un tipo de ubicación por su ID
        const locationType = await Location.getLocationTypeById(id);
    
        // Responder al cliente con el tipo de ubicación
        res.status(200).json({
        msg: "Tipo de ubicación obtenido correctamente",
        ok: true,
        locationType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const deleteLocationTypeById = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);
    
    try {
        // Borrar un tipo de ubicación por su ID
        const locationType = await Location.deleteLocationTypeById(id);
    
        // Responder al cliente con el tipo de ubicación borrado
        res.status(200).json({
        msg: "Tipo de ubicación borrado correctamente",
        ok: true,
        locationType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const readAllLocationsByType = async (req, res = response) => {
    // Extraer el ID de la petición
    const type = parseInt(req.params.type);
    
    try {
        // Leer todas las ubicaciones de un tipo de ubicación
        const locations = await Location.getLocationsByType(type);
    
        // Responder al cliente con las ubicaciones
        res.status(200).json({
        msg: "Ubicaciones obtenidas correctamente por tipo",
        ok: true,
        locations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const readAllLocationsByUser = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);

    try {
        // Leer todas las ubicaciones de un usuario
        const locations = await Location.getLocationsByUser(id);

        // Responder al cliente con las ubicaciones
        res.status(200).json({
        msg: "Ubicaciones obtenidas correctamente por usuario",
        ok: true,
        locations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }
};

export const createLocationPhoto = async (req, res = response) => {
    // Extraer el body de la petición
    const { locationId, url } = req.body;

    try {
        // Crear una nueva foto de ubicación
        const locationPhoto = await Location.createLocationPhoto(locationId, url);

        // Responder al cliente con la foto de ubicación creada
        res.status(201).json({
        msg: "Foto de ubicación creada correctamente",
        ok: true,
        locationPhoto,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        });
    }

}

export const readAllLocationPhotos = async (req, res = response) => {
    try {
        // Pedir el ID de la ubicación
        const id = parseInt(req.params.id);

        // Leer todas las fotos de ubicación
        const locationPhotos = await Location.readAllLocationPhotos(id);

        // Responder al cliente con las fotos de ubicación
        res.status(200).json({
        msg: "Fotos de ubicación obtenidas correctamente",
        ok: true,
        locationPhotos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs",
        }); 
    }
};

export const deleteLocationPhotoById = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);

    try {
        // Borrar una foto de ubicación por su ID
        const locationPhoto = await Location.deleteLocationPhotoById(id);

        // Responder al cliente con la foto de ubicación borrada
        res.status(200).json({
        msg: "Foto de ubicación borrada correctamente",
        ok: true,
        locationPhoto,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs"
        });
    }
};

export const createLocationReview = async (req, res = response) => {
    // Extraer el body de la petición
    const locationId = parseInt(req.params.id);
    const userId = parseInt(req.body.userId);
    const score = parseInt(req.body.score);

    try {
        // Crear una nueva review de ubicación
        const locationReview = await Location.createLocationReview(locationId, userId, score);

        // Responder al cliente con la review de ubicación creada
        res.status(201).json({
        msg: "Review de ubicación creada correctamente",
        ok: true,
        locationReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs"
        });
    }
};

export const readAllLocationReviews = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);

    try {
        // Leer todas las reviews de ubicación
        const locationReviews = await Location.readAllLocationReviews(id);

        // Responder al cliente con las reviews de ubicación
        res.status(200).json({
        msg: "Reviews de ubicación obtenidas correctamente",
        ok: true,
        locationReviews,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs"
        });
    }
};

export const updateLocationReviewById = async (req, res = response) => {
    // Extraer el ID de la petición
    const id = parseInt(req.params.id);
    const score = parseInt(req.body.score);

    try {
        // Actualizar una review de ubicación por su ID
        const locationReview = await Location.updateLocationReviewById(id, score);

        // Responder al cliente con la review de ubicación actualizada
        res.status(200).json({
        msg: "Review de ubicación actualizada correctamente",
        ok: true,
        locationReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: "Error en el servidor, revisa los logs"
        });
    }
};
