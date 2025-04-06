import { userModel } from "../models/schema.js";
import bcrypt from "bcrypt"
export const userSignup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    // hash the password
    await userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: error });
    }
  }
};
