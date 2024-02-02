import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
global.__basedir = __dirname;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "25mb" }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// Error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
