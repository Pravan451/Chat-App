import express from 'express'
import { protectRoutes } from './../middleware/auth.middleware.js';
import { getUsersForSideBar,getMessages,postMessages } from '../controller/message.controller.js';
export const messageRoute = express.Router();


messageRoute.get("/users",protectRoutes,getUsersForSideBar);

messageRoute.get("/:id",protectRoutes,getMessages);

messageRoute.post("/sent/:id",protectRoutes,postMessages);