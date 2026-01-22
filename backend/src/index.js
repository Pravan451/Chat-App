import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { authRoutes } from "./routes/auth.routes.js";
import { messageRoute } from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5000;

/* ===================== MIDDLEWARES ===================== */

app.use(express.json());
app.use(cookieParser());

// 🔥 FINAL CORS FIX (works with Socket.IO + Render)
app.use(
  cors({
    origin: true,          // ← THIS IS THE KEY
    credentials: true,
  })
);

// 🔥 FORCE PREFLIGHT RESPONSE
app.options("*", cors());

/* ===================== ROUTES ===================== */

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

/* ===================== START SERVER ===================== */

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
