import { Router } from "express";
import checkoutController from "../controllers/checkout.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.route("/").post(auth, checkoutController.checkout);

export default router;
