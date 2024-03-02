import bcrypt from "bcryptjs";
import { prisma } from "../utils/db.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
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
        message: "Modificado correctamente.",
        user: userUpate,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const sortParam = req.query.sort;
    const pageParam = Number(req.query.page) || 0;
    const limitParam = Number(req.query.limit) || 1;
    const querySearchParam = req.query.querySearch;

    let sortDef;

    switch (sortParam) {
      case "latest":
        sortDef = { createdAt: "desc" }; //Último
        break;
      case "oldest":
        sortDef = { createdAt: "asc" }; //Más antiguo
        break;
      default:
        sortDef = { createdAt: "desc" }; //Último
        break;
    }

    const skip = (pageParam - 1) * limitParam; // Calcula el offset

    const [records, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        orderBy: sortDef,
        where: { name: { contains: querySearchParam } },
        take: limitParam || undefined,
        skip: Number(skip) || undefined,
      }),
    ]);

    const totalRecords = querySearchParam === "" ? records : users.length;
    const totalPages = Math.ceil(totalRecords / limitParam);

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

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
      lastMonthUsers,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.role === "ADMIN" && req.id !== req.params.userId) {
      return next(
        errorHandler(403, "No tienes permiso para eliminar este usuario.")
      );
    }

    const deleteUser = await prisma.user.delete({
      where: { id: req.params.userId },
    });

    if (deleteUser) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Eliminado correctamente.",
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
      },
    });

    if (!user) {
      return next(errorHandler(404, "Usuario no encontrado"));
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Procesado correctamente",
      user,
    });
  } catch (error) {
    return next(error);
  }
};
