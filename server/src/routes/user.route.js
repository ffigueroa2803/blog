import { Router } from "express";
import { getusers, update } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateSchema } from "./../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.use(verifyJWT);

router.get("/getusers", getusers);
router.put("/update/:userId", validateSchema(createUserSchema), update);

export default router;
