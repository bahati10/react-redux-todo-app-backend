import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserService } from "../services/user.service.js";
import { generateToken } from "../utilis/generateToken.js";
import { validateUserCreation } from "../validations/user.validation.js";

class userController {
  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Validate the request body
      const validationErrors = validateUserCreation(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const { email, firstname, password } = req.body;

      // Check if the email already exists
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await UserService.createUser({
        ...req.body,
        password: hashedPassword,
      });

      const token = generateToken(res, user.id, email, firstname);

      return res.status(201).json({
        message: "Signup was successfull",
        token,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await UserService.getUserById(userId);
      if (user) {
        return res
          .status(200)
          .json({ message: "User Retrieved succesfully", user });
      }
      return res.status(404).json({ error: "User not found" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await UserService.getAllUsers();
      return res
        .status(200)
        .json({ message: "Users Retrieved succesfully", users });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = parseInt(req.params.id, 10);
      const deleted = await UserService.deleteUser(userId);
      if (deleted) {
        return res.status(200).json({ message: "User deleted successfully" });
      }
      return res.status(404).json({ error: "User not found" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = generateToken(res, user.id, user.email, user.firstname);

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("jwt", { path: "/" });
      res.cookie("loggedOut", true, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 1000,
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
}

export const UserController = new userController();
