import bcrypt from "bcryptjs";
import { prisma } from "../utils/db.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    let hashedPwd = "";
    const { email, name, image, password, role } = req.body;

    // Compruebe si hay un email de usuario duplicado
    const duplicate = await prisma.user.findFirst({ where: { email } });

    if (duplicate) {
      next(errorHandler(409, "Nombre de email duplicado"));
    }

    // Contraseña hash
    if (password)
      hashedPwd = await bcrypt.hash(password, 10); // Fragmento aleatorio 10
    else hashedPwd = null;

    // Crear y almacenar nuevo usuario
    const user = await prisma.user.create({
      data: { email, name, image, password: hashedPwd, role },
    });

    if (user) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Nuevo usuario ${name} creado`,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};
