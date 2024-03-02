import { prisma } from "../utils/db.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  try {
    if (!req.role === "ADMIN") {
      return next(
        errorHandler(403, "No tienes permiso para crear una publicación.")
      );
    }
    if (!req.body.title || !req.body.content) {
      return next(
        errorHandler(400, "Por favor proporcione todos los campos requeridos")
      );
    }
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = await prisma.post.create({
      data: { ...req.body, slug, authorId: req.id },
    });

    if (newPost) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Nuevo post creado correctamente`,
        post: newPost,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const sortParam = req.query.sort;
    const pageParam = Number(req.query.page) || 0;
    const limitParam = Number(req.query.limit) || 1;
    const userId = req.query.userId;
    const category = req.query.category;
    const slug = req.query.slug;
    const postId = req.query.postId;
    const querySearchParam = req.query.querySearch;

    let sortDef;

    switch (sortParam) {
      case "latest":
        sortDef = { updatedAt: "desc" }; //Último
        break;
      case "oldest":
        sortDef = { updatedAt: "asc" }; //Más antiguo
        break;
      default:
        sortDef = { updatedAt: "desc" }; //Último
        break;
    }

    const skip = (pageParam - 1) * limitParam; // Calcula el offset

    const [records, posts] = await Promise.all([
      prisma.post.count(),
      prisma.post.findMany({
        orderBy: sortDef,
        where: {
          ...(postId && { id: postId }),
          ...(category && { category }),
          ...(slug && { slug }),
          ...(userId && { authorId: userId }),
          ...(querySearchParam && {
            OR: [
              { title: { contains: querySearchParam } },
              { content: { contains: querySearchParam } },
            ],
          }),
        },
        take: limitParam || undefined,
        skip: Number(skip) || undefined,
      }),
    ]);

    const totalRecords = querySearchParam === "" ? records : posts.length;
    const totalPages = Math.ceil(totalRecords / limitParam);

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await prisma.post.count({
      where: {
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Procesado correctamente.",
      data: posts,
      meta: {
        totalItems: Number(totalRecords),
        itemCount: Number(posts.length),
        itemsPerPage: limitParam,
        totalPages: Number(totalPages),
        currentPage: pageParam,
      },
      lastMonthPosts,
    });
  } catch (error) {
    return next(error);
  }
};
