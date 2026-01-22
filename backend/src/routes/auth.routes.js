import express from "express";
import {
  getUser,
  LogIn,
  Logout,
  SignUp,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/signup", SignUp);

authRoutes.post("/login", LogIn);

authRoutes.post("/logout", Logout);

authRoutes.put("/update-profile", protectRoutes, updateProfile);

authRoutes.get("/check", protectRoutes, getUser);

//GuRr5XP21wtzgIvs
