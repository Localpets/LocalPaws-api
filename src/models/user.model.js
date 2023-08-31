// Importar PrismaClient
import { PrismaClient } from "@prisma/client";

// Instanciar el cliente de Prisma
const prisma = new PrismaClient();

// Clase de usuario para interactuar con la base de datos mediante Prisma
class User {
  constructor() {
    this.thumbnail = thumbnail;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.type = type;
    this.marketing_accept = marketing_accept;
  }

  // Método estático para crear un usuario en la base de datos
  static async createUser(phoneNumber, firstName, lastName, username, email, password, type = 'USER', gender = 'not specified', token, marketing_accept = false) {
    return prisma.user.create({
      data: {
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
        type,
        gender,
        token,
        marketing_accept,
      },
    });
  }

  static async createAdminToken(user_id, token) {
    return prisma.adminToken.create({
      data: {
        token,
        user_id,
      },
    });
  }

  // Método estático para actualizar un usuario en la base de datos
  static async updateUser(id, data) {
    return prisma.user.update({
      where: { user_id: id },
      data
    });
  }

  // Método estático para actualizar el token de un usuario en la base de datos
  static async updateUserToken(userId, token) {
    return prisma.user.update({
        where: { user_id: userId },
        data: {
            token: token,
        },
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

  // Método estático para leer un usuario de la base de datos por su email
  static async getUserByEmail(email) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  // Método estático para borrar un usuario de la base de datos por su ID
  static async deleteUserById(user_id) {
    return prisma.user.delete({
      where: { user_id: user_id },
    });
  }

  static async createUserType(name) {
    return prisma.userType.create({
      data: {
        name,
      },
    });
  }

  // Método estático para leer todos los tipos de usuario de la base de datos
  static async readAllUserTypes() {
    return prisma.userType.findMany();
  }

  // Método estático para leer un tipo de usuario de la base de datos por su ID
  static async getUserTypeById(id) {
    return prisma.userType.findUnique({
      where: { user_type_id: id },
    });
  }

  // Método estático para borrar un tipo de usuario de la base de datos por su ID
  static async deleteUserTypeById(id) {
    return prisma.userType.delete({
      where: { user_type_id: id },
    });
  }

  // Metodo estatico para crear un genero de usuario
  static async createUserGender(name) {
    return await prisma.userGender.create({
      data: {
        name,
      },
    });
  }

  // Metodo estatico para leer todos los generos de usuario
  static async readAllUserGenders() {
    return await prisma.userGenderType.findMany();
  }

  // Metodo estatico para leer un genero de usuario por su ID
  static async getUserGenderById(id) {
    return await prisma.userGenderType.findUnique({
      where: { userGenderTypeId: id },
    });
  }

  // Metodo estatico para borrar un genero de usuario por su ID
  static async deleteUserGenderById(id) {
    return await prisma.userGenderType.delete({
      where: { user_gender_type_id: id },
    });
  }
}

export default User;