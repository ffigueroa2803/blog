import { errorHandler } from "../utils/error.js";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return next(
      errorHandler(
        400,
        error.errors.map((error) => error.message)
      )
    );
  }
};
