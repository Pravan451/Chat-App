import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { authRoutes } from "./routes/auth.routes.js";
import { messageRoute } from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* ===================== MIDDLEWARES ===================== */

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app1-5vrv.onrender.com",
  "https://chat-app1-kdzf.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 THIS FIXES THE PREFLIGHT (MOST IMPORTANT LINE)
app.options("*", cors());

/* ===================== ROUTES ===================== */

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

/* ===================== SERVER START ===================== */

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
