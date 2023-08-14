// Importar paquetes de NODE
import { PrismaClient } from "@prisma/client";

// Iniciar el cliente de Prisma para conectarse a la base de datos
const prisma = new PrismaClient();

// Crear la clase Auth, que se encargará de manejar la autenticación de los usuarios

class Auth {
  constructor() {
    this.thumbnail = thumbnail;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.type = type;
    // optional
    this.gender = gender;
  }

  // Método para validar si el usuario ya existe en la base de datos
  static async validateUserAlreadyExists(email) {
    const q = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (q) {
        return true;
    }
  }

  // Método para crear loguear al usuario
  static async findUser(email, password) {

    // Validar si el usuario existe
    const q = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (q) {
      return q;
    } else {
      return false;
    }

  }

}

export default Auth;