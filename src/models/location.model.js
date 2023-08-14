// Importar PrismaClient
import { PrismaClient } from "@prisma/client";

// Instanciar el cliente de Prisma
const prisma = new PrismaClient();

// Clase de ubicación para interactuar con la base de datos mediante Prisma
class Location {
  constructor(title, lat, lng, address, type, userCreatedId, locationPhotos) {
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.address = address;
    this.type = type;
    this.userCreatedId = userCreatedId;
    this.locationPhotos = locationPhotos;
  }

  // Método estático para crear una ubicación en la base de datos
  static async createLocation(title, lat, lng, address, type, userCreatedId, locationPhotos) {
    return await prisma.location.create({
      data: {
        title,
        lat,
        lng,
        address,
        type,
        userCreatedId,
        locationPhotos,
      },
    });
  }

  // Método estático para actualizar una ubicación en la base de datos
  static async updateLocation(id, data) {
    return await prisma.location.update({
      where: { location_id: id },
      data,
    });
  }

  // Método estático para leer todas las ubicaciones de la base de datos
  static async readAllLocations() {
    return await prisma.location.findMany();
  }

  // Método estático para leer una ubicación de la base de datos por su ID
  static async getLocationById(id) {
    return await prisma.location.findUnique({
      where: { location_id: id },
    });
  }

  // Metodo estatico para obtener los lugares por user
  static async getLocationsByUser(userId) {
    return await prisma.location.findMany({
      where: { userCreatedId: userId },
    });
  }

  // Método estático para borrar una ubicación de la base de datos por su ID
  static async deleteLocationById(id) {
    return await prisma.location.delete({
      where: { location_id: id },
    });
  }

  // Metodo estatico para crear un Tipo de ubicación
  static async createLocationType(name) {
    return await prisma.locationType.create({
      data: {
        name,
      },
    });
  }

  // Metodo estatico para leer todos los tipos de ubicación
  static async readAllLocationTypes() {
    return await prisma.locationType.findMany();
  }

  // Metodo estatico para leer un tipo de ubicación por su ID
  static async getLocationTypeById(id) {
    return await prisma.locationType.findUnique({
      where: { location_type_id: id },
    });
  }

  // Metodo estatico para borrar un tipo de ubicación por su ID
  static async deleteLocationTypeById(id) {
    return await prisma.locationType.delete({
      where: { location_type_id: id },
    });
  }

  // Metodo estatico para obtener todas las localizaciones por tipo
  static async getLocationsByType(type) {
    return await prisma.location.findMany({
      where: { title: type },
    });
  }
  // Metodo estatico para crear una foto de ubicación
  static async createLocationPhoto(locationId, url) {
    return await prisma.locationPhoto.create({
      data: {
        locationId,
        url
      }
    });
  }
  
  // Metodo estatico para leer todas las fotos de ubicación
  static async readAllLocationPhotos(id) {
    return await prisma.locationPhoto.findMany({where: {locationId: id}});
  }

  // Metodo estatico para borrar una foto de ubicación por su ID 
  static async deleteLocationPhotoById(id) {
    return await prisma.locationPhoto.delete({
      where: { location_photo_id: id },
    });
  }

  // Metodo estatico para hacer una review de una ubicación
  static async createLocationReview(locationId, userId, score) {
    return await prisma.locationReview.create({
      data: {
        locationId,
        userId,
        score,
      }
    });
  }   

  // Metodo estatico para leer todas las reviews de una ubicación
  static async readAllLocationReviews(locationId) {
    return await prisma.locationReview.findMany({
      where: { locationId },
    });
  }

  // Metodo estatico para borrar una review de una ubicación por su ID
  static async updateLocationReviewById(id, score) {
    return await prisma.locationReview.update({
      where: { location_review_id: id },
      score
    });
  }
}

export default Location;