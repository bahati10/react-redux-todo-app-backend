import Todo from "../models/todo.model.js";

class todoService {
  async createTodo(content: string): Promise<Todo> {
    try {
      const newTodo = await Todo.create({ content });
      return newTodo;
    } catch (error: any) {
      throw new Error(`Error creating todo: ${error.message}`);
    }
  }

  async getAllTodos() {
    try {
      const todos = await Todo.findAll();

      return todos;
    } catch (error: any) {
      throw new Error(`Error fetching todos: ${error.message}`);
    }
  }

  async getTodoById(id: number) {
    try {
      const todo = await Todo.findByPk(id);

      return todo;
    } catch (error: any) {
      `Error fetching todo: ${error.message}`;
    }
  }

  async updateContent(id: number, newContent: string): Promise<Todo | null> {
    try {
      const todo = await Todo.findByPk(id);
      if (!todo) {
        throw new Error("Todo not found");
      }

      const updatedContent = todo.update({ content: newContent });
      await todo.save();

      return updatedContent;
    } catch (error: any) {
      throw new Error(`Error updating todo content: ${error.message}`);
    }
  }

  async updateCompleteStatus(id: number) {
    try {
      const todo = await Todo.findByPk(id);

      if (!todo) {
        throw new Error("Todo not found");
      }

      const currentStatus = todo.getDataValue("status");
      const updatedStatus = todo.update({ status: !currentStatus });
      await todo.save();

      return updatedStatus;
    } catch (error: any) {
      `Error updating todo status: ${error.message}`;
      throw new Error();
    }
  }

  async deleteTodo(id: number): Promise<boolean> {
    try {
      const todo = await Todo.findByPk(id);
      if (todo) {
        await todo.destroy();
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  }
}

export const TodoService = new todoService();
