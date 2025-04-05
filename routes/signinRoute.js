import { Router } from "express";
import { userSignin } from "../controllers/index.js";

const router = Router();

router.route("/").post(userSignin);

export default router;
