// Importar PrismaClient
import { PrismaClient } from "@prisma/client";

// Instanciar el cliente de Prisma
const prisma = new PrismaClient();

// Clase de ubicación para interactuar con la base de datos mediante Prisma
class Location {
  constructor(lat, lng, address, thumbnail, type, userCreatedId, photo, description) {
    this.lat = lat;
    this.lng = lng;
    this.address = address;
    this.thumbnail = thumbnail;
    this.type = type;
    this.userCreatedId = userCreatedId;
    this.photo = photo;
    this.description = description;
  }

  // Método estático para crear una ubicación en la base de datos
  static async createLocation(lat, lng, address, thumbnail, type, userCreatedId, photo, description) {
    return prisma.location.create({
      data: {
        lat,
        lng,
        address,
        thumbnail,
        type,
        user_created_id: userCreatedId,
        photo,
        description,
      },
    });
  }

  // Método estático para actualizar una ubicación en la base de datos
  static async updateLocation(id, data) {
    return prisma.location.update({
      where: { location_id: id },
      data,
    });
  }

  // Método estático para leer todas las ubicaciones de la base de datos
  static async readAllLocations() {
    return prisma.location.findMany();
  }

  // Método estático para leer una ubicación de la base de datos por su ID
  static async getLocationById(id) {
    return prisma.location.findUnique({
      where: { location_id: id },
    });
  }

  // Método estático para borrar una ubicación de la base de datos por su ID
  static async deleteLocationById(id) {
    return prisma.location.delete({
      where: { location_id: id },
    });
  }
}

export default Location;