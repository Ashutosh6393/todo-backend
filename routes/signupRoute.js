import { Router } from "express";
import { userSignup } from "../controllers/index.js";

const router = Router();

router.route("/").post(userSignup);

export default router;
