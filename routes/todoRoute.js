import { Router } from "express";
import { getTodos, addNewTodo } from "../controllers/index.js";

const router = Router();

router.route("/").get(getTodos).post(addNewTodo);

export default router;
