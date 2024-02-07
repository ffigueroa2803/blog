import { Router } from "express";
import { getusers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(verifyJWT);

router.get("/getusers", getusers);

export default router;
