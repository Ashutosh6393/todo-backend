import jwt from "jsonwebtoken";
import { jwtSecret } from "../conf.js";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    }else{
        res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

export default auth;
