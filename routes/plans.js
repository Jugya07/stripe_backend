import { Router } from "express";
import planController from "../controllers/plans.js";

const router = Router();

router
  .route("/")
  .get(planController.getAllPlans)
  .post(planController.createPlan);

export default router;
