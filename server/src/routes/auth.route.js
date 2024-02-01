import { Router } from "express";
import { signin, signout, refresh } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refresh", refresh);

export default router;
