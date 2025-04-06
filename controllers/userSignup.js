import { userModel } from "../models/schema.js";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3).max(20),
});

export const userSignup = async (req, res) => {
  try {
    const validatedData = userSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({ errors: validatedData.error.flatten() });
    }

    const { email, password, name } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10); // better to use 10 rounds for production

    await userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};
