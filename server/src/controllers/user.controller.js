import { prisma } from "../utils/db.js";

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
