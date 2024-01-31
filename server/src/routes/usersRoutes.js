import { Router } from "express";
import { readyEmail, register } from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { createUserSchema } from "../schemas/userSchema.js";
import { verifyJWT } from "./../middlewares/authMiddleware.js";

const router = Router();

// router.use(verifyJWT);

router.post("/register", validateSchema(createUserSchema), register);
router.get("/:email", readyEmail);

export default router;
