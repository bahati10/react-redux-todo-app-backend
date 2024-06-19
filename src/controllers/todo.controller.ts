// src/controllers/TodoController.ts
import { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";

class TodoController {
  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { content } = req.body;
      const newTodo = await TodoService.createTodo(content);
      res.status(201).json(newTodo);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await TodoService.getAllTodos();
      res.status(200).json({ message: "Todo succesfully retrieved", todos });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const todo = await TodoService.getTodoById(Number(id));
      res.status(200).json({ message: "Todo succesfully retrieved", todo });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  updateContent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const updatedTodo = await TodoService.updateContent(Number(id), content);
      if (!updatedTodo) {
        res.status(404).json({ message: "Todo not found" });
      } else {
        res
          .status(200)
          .json({ message: "Updated Todo succesfully", updatedTodo });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateCompleteStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedTodo = await TodoService.updateCompleteStatus(Number(id));
      res
        .status(200)
        .json({ message: "Updated Todo succesfully", updatedTodo });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const deletedTodo = await TodoService.deleteTodo(Number(id));

      if (deletedTodo) {
        return res.status(200).json({ message: "Todo Deleted succesfully" });
      }

      return res.status(404).json({ message: "Todo not found" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default new TodoController();
