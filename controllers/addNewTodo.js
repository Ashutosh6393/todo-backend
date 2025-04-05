import { todoModel } from "../models/schema.js";

export const addNewTodo = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const userId = req.user.id; 
    await todoModel.create({
        title,
        description,
        done,
        userId
    })
    res.status(201).json({ message: "Todo added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
