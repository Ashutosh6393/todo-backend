import auth from "./middlewares/authentication.js";
import signinRoute from "./routes/signinRoute.js";
import signupRoute from "./routes/signupRoute.js";
import todoRoute from "./routes/todoRoute.js";
import connectDB from "./db.js";
import express from "express";
import { port } from "./conf.js";

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the backend of todo app",
  });
});

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/todo", auth, todoRoute);

app.listen(3000, () => {
  console.log("Server started at port: ", port);
});
