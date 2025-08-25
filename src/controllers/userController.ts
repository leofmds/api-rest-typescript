import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  getAll: (req: Request, res: Response) => {
    res.json(userService.getAll());
  },

  getById: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = userService.getById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  },

  create: (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = userService.create({ name, email });
    res.status(201).json(newUser);
  },

  update: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedUser = userService.update(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  },

  del: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const success = userService.del(id);
    if (!success) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  }
};