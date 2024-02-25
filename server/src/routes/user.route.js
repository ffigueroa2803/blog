import { Router } from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateSchema } from "./../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.get("/getusers", verifyJWT, getUsers);
router.put(
  "/update/:userId",
  verifyJWT,
  validateSchema(createUserSchema),
  updateUser
);
router.delete("/delete/:userId", verifyJWT, deleteUser);

export default router;
