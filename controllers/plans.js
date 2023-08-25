import Plan from "../models/plan.js";
import catchAsync from "../utils/catchAsync.js";

const getAllPlans = catchAsync(async (_req, res) => {
  const plans = await Plan.find();
  res.json({
    status: "success",
    message: "Plans fetched successfully",
    plans,
  });
});

const createPlan = catchAsync(async (req, res) => {
  const plan = await Plan.create(req.body);
  res.json({
    status: "success",
    message: "Plan created successfully",
    plan,
  });
});

export default { getAllPlans, createPlan };
