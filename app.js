import dotenv from "dotenv";
dotenv.config("./.env");
import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.js";
import planRoutes from "./routes/plans.js";
import checkoutRoutes from "./routes/checkout.js";
import { errorLogger, errorHandler } from "./middleware/error.js";

const app = express();

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.options("*", (_req, res) => {
  return res.status(200).json("success");
});

app.use("/api/user", userRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/create_session_checkout", checkoutRoutes);

app.use(errorLogger);
app.use(errorHandler);

export default app;
