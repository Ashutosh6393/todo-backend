import { userModel } from "../models/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../conf.js";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userSignin = async (req, res) => {
  const validated = signinSchema.safeParse(req.body);

  if (!validated.success) {
    return res.status(400).json({ errors: validated.error.flatten() });
  }

  const { email, password } = validated.data;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

    res.status(200).json({ message: "User signed in successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
