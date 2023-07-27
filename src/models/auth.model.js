// Importar paquetes de NODE
import { PrismaClient } from "@prisma/client";

// Iniciar el cliente de Prisma para conectarse a la base de datos
const prisma = new PrismaClient();

// Crear la clase Auth, que se encargará de manejar la autenticación de los usuarios

class Auth {
  constructor(thumbnail, phoneNumber, firstName, lastName, email, password, gender = 'not specified', type) {}

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