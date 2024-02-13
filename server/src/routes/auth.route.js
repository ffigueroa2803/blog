import { Router } from "express";
import {
  signin,
  signout,
  refreshtoken,
  signup,
  google,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { createAuthSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/signup", validateSchema(createUserSchema), signup);
router.post("/signin", validateSchema(createAuthSchema), signin);
router.post("/google", google);
router.post("/signout", signout);
router.post("/refreshtoken", refreshtoken);

export default router;
