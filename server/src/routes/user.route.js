import { Router } from "express";
import { signup } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(verifyJWT);

router.post("/signup", validateSchema(createUserSchema), signup);

export default router;
