import bcrypt from "bcryptjs";
import { prisma } from "../utils/db.js";
import { errorHandler } from "../utils/error.js";

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

    const totalRecords = querySearchParam === "" ? records : users.length;
    const totalPages = Math.ceil(totalRecords / limitParam);

    const usersWithoutPassword = users.map((user) => {
      delete user.password;
      return user;
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Procesado correctamente.",
      data: usersWithoutPassword,
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

export const update = async (req, res, next) => {
  try {
    let hashedPwd = "";
    const { userId } = req.params;
    const { email, name, image, password } = req.body;

    if (req.id !== userId) {
      return next(
        errorHandler(403, "No tienes permiso para actualizar este usuario.")
      );
    }

    if (password) {
      hashedPwd = await bcrypt.hash(password, 10);
    }

    const userUpate = await prisma.user.update({
      where: { id: userId },
      data: { email, name, image, password: hashedPwd },
    });

    if (userUpate) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Procesado correctamente.",
      });
    }
  } catch (error) {
    return next(error);
  }
};
