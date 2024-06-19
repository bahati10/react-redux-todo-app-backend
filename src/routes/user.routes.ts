import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

export const userRouter = express.Router();

userRouter.post("/register", UserController.createUser);
userRouter.post("/login", UserController.login);
userRouter.get("/users/:id", isLoggedIn, UserController.getUserById);
userRouter.get("/users", isLoggedIn, UserController.getAllUsers);
userRouter.delete("/users/delete/:id", isLoggedIn, UserController.deleteUser);
userRouter.post("/logout", UserController.logout);
