import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FRONTEND_URL } from "./config.js";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
global.__basedir = __dirname;

app.use(
  cors({ origin: FRONTEND_URL, credentials: true, optionsSuccessStatus: 200 })
);

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

export default app;
