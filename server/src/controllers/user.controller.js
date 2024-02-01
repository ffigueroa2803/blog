import bcrypt from "bcryptjs";
import { prisma } from "../utils/db.js";

export const signup = async (req, res) => {
  try {
    let hashedPwd = "";
    const { email, name, image, password, role } = req.body;

    // Compruebe si hay un email de usuario duplicado
    const duplicate = await prisma.user.findFirst({ where: { email } });

    if (duplicate) {
      return res
        .status(409)
        .json({ status: false, message: "Nombre de email duplicado" });
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
      res
        .status(200)
        .json({ status: true, message: `Nuevo usuario ${name} creado`, user });
    } else {
      res.status(400).json({
        status: false,
        message: "Se recibieron datos de usuario no válidos",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
