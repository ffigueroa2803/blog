import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FRONTEND_URL } from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
global.__basedir = __dirname;

app.use(
  cors({ origin: FRONTEND_URL, credentials: true, optionsSuccessStatus: 200 })
);

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);

export default app;
