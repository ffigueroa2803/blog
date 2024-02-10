import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      next(errorHandler(401, "No autorizado"));
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return next(errorHandler(403, "Prohibido"));
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    return next(errorHandler(401, "No autorizada, sin token o ha expirado"));
  }
};
