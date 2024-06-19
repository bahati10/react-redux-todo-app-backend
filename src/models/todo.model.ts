import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js";

interface TodoAttributes {
  id: number;
  content: string;
  status: boolean;
}

interface TodoCreationAttributes
  extends Optional<TodoAttributes, "id" | "status"> {}

class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;

  public content!: string;

  public status!: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Todos",
  }
);

export default Todo;
