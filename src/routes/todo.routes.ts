import express from "express";
import todoController from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

export const todoRouter = express.Router();

todoRouter.post("/todo/create", isLoggedIn, todoController.createTodo);
todoRouter.get("/todo/all", isLoggedIn, todoController.getAllTodos);
todoRouter.get("/todo/:id", isLoggedIn, todoController.getTodoById);
todoRouter.put("/todo/update/:id", isLoggedIn, todoController.updateContent);
todoRouter.put(
  "/todo/complete/:id",
  isLoggedIn,
  todoController.updateCompleteStatus
);
todoRouter.delete("/todo/delete/:id", isLoggedIn, todoController.deleteTodo);
