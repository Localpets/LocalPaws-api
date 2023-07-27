// Importar PrismaClient
import { PrismaClient } from "@prisma/client";

// Instanciar el cliente de Prisma
const prisma = new PrismaClient();

// Clase de usuario para interactuar con la base de datos mediante Prisma
class User {
  constructor(thumbnail, phoneNumber, firstName, lastName, email, password, gender = 'not specified', type) {
    this.thumbnail = thumbnail;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }

  // Método estático para crear un usuario en la base de datos
  static async createUser(thumbnail, phoneNumber, firstName, lastName, email, password, gender = 'not specified', type) {
    return prisma.user.create({
      data: {
        thumbnail,
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        gender,
        type,
      },
    });
  }

  // Método estático para actualizar un usuario en la base de datos
  static async updateUser(id, data) {
    return prisma.user.update({
      where: { user_id: id },
      data,
    });
  }

  // Método estático para leer todos los usuarios de la base de datos
  static async readAllUsers() {
    return prisma.user.findMany();
  }

  // Método estático para leer un usuario de la base de datos por su ID
  static async getUserById(id) {
    return prisma.user.findUnique({
      where: { user_id: id },
    });
  }

  // Método estático para borrar un usuario de la base de datos por su ID
  static async deleteUserById(id) {
    return prisma.user.delete({
      where: { user_id: id },
    });
  }
}

export default User;