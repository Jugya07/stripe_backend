import dotenv from "dotenv";
dotenv.config("../.env");
import catchAsync from "../utils/catchAsync.js";
import Stripe from "stripe";
import Plan from "../models/plan.js";

console.log(process.env.FRONTEND_URL);
const stripe = new Stripe(process.env.STRIPE_SECRET);

const checkout = catchAsync(async (req, res) => {
  const { plan, isMonth } = req.body;
  const userId = req.user._id;
  const planPrice = await Plan.findById(plan);
  const line_item = {
    price_data: {
      currency: "inr",
      product_data: {
        name: `Plan name: ${planPrice.plan_name}`,
      },
      unit_amount: isMonth ? planPrice.m_price * 100 : planPrice.y_price * 100,
    },
    quantity: 1,
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [line_item],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/subscription/success?user_id=${userId}&plan_id=${plan}&is_month=${isMonth}`,
    cancel_url: `${process.env.FRONTEND_URL}/subscription`,
  });
  res.json({ id: session.id });
});

export default { checkout };
