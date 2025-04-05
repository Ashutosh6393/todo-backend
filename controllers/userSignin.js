import { userModel } from "../models/schema.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../conf.js";
export const userSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await userModel.findOne({ email: email });
    if (userExists && userExists.password === password) {
      const token = jwt.sign({ id: userExists._id }, jwtSecret, {
        expiresIn: "1d",
      });
      res.status(200).json({ message: "User signed in successfully", token });
    } else {
      res.status(401).json({ message: "Email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
