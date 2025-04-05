import { todoModel } from "../models/schema.js";
export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await todoModel.find({ userId: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
