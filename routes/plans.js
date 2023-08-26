import { Router } from "express";
import planController from "../controllers/plans.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router
  .route("/")
  .get(auth, planController.getAllPlans)
  .post(planController.createPlan);

export default router;
