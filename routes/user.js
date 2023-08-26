import { Router } from "express";
import userController from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router
  .route("/")
  .get(auth, userController.getPlan)
  .patch(auth, userController.setPlan)
  .delete(auth, userController.deletePlan);

export default router;
