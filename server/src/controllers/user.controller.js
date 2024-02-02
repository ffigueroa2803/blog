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

export const getusers = async (req, res, next) => {
  try {
    const pageParam = Number(req.query.page) || 0;
    const limitParam = Number(req.query.limit) || 1;
    const querySearchParam = req.query.querySearch;

    const skip = (pageParam - 1) * limitParam; // Calcula el offset

    const [records, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        where: { name: { contains: querySearchParam } },
        take: limitParam || undefined,
        skip: Number(skip) || undefined,
      }),
    ]);

    const totalRecords =
      querySearchParam === "" ? records : publications.length;
    const totalPages = Math.ceil(totalRecords / limitParam);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Procesado correctamente.",
      data: users,
      meta: {
        totalItems: Number(totalRecords),
        itemCount: Number(users.length),
        itemsPerPage: limitParam,
        totalPages: Number(totalPages),
        currentPage: pageParam,
      },
    });
  } catch (error) {
    next(error);
  }
};
