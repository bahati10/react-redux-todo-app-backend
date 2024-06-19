import express from "express";
import todoController from "../controllers/todo.controller.js";

export const todoRouter = express.Router();

todoRouter.post("/todo/create", todoController.createTodo);
todoRouter.get("/todo/all", todoController.getAllTodos);
todoRouter.get("/todo/:id", todoController.getTodoById);
todoRouter.put("/todo/update/:id", todoController.updateContent);
todoRouter.put("/todo/complete/:id", todoController.updateCompleteStatus);
todoRouter.delete("/todo/delete/:id", todoController.deleteTodo);
