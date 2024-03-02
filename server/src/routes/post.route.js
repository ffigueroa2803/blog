import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPostSchema } from "./../schemas/post.schema.js";

const router = Router();

router.post("/create", validateSchema(createPostSchema), verifyJWT, createPost);
router.get("/getposts", verifyJWT, getPosts);

export default router;
