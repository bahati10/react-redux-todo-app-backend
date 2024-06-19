import { Op } from "sequelize";
import { validateUserCreation } from "../validations/user.validation.js";
import User from "../models/user.model.js";
import UserCreationAttributes from "../models/user.model.js";
import UserAttributes from "../models/user.model.js";

export class userService {
  async createUser(
    userDetails: UserCreationAttributes
  ): Promise<UserAttributes> {
    const validationErrors = validateUserCreation(userDetails);
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
    }
    try {
      const user = await User.create(userDetails);
      return user.toJSON() as UserAttributes;
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserById(userId: number): Promise<UserAttributes | null> {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });
      return user ? (user.toJSON() as UserAttributes) : null;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<UserAttributes[]> {
    try {
      const users = await User.findAll();
      return users.map((user) => user.toJSON() as UserAttributes);
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy();
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  async getUserByFields(
    fields: Partial<UserAttributes>
  ): Promise<UserAttributes | null> {
    try {
      const user = await User.findOne({
        where: {
          [Op.and]: fields,
        },
        attributes: { exclude: ["password"] },
      });
      return user ? (user.toJSON() as UserAttributes) : null;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async getUserByEmail(email: string): Promise<UserAttributes | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? (user.toJSON() as UserAttributes) : null;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}

export const UserService = new userService();
