import { Router } from "express";
import {
  signin,
  signout,
  refreshtoken,
  signup,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.post("/signup", validateSchema(createUserSchema), signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refreshtoken", refreshtoken);

export default router;
