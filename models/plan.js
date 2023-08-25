import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  m_price: {
    type: Number,
    required: true,
  },
  y_price: {
    type: Number,
    required: true,
  },
  video_quality: {
    type: String,
    required: true,
  },
  resolution: {
    type: Number,
    required: true,
  },
  devices: {
    type: [String],
    required: true,
  },
  active_screens: {
    type: Number,
    required: true,
  },
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
