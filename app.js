import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/user.js";
import planRoutes from "./routes/plans.js";
import { auth } from "./middleware/auth.js";
import { errorLogger, errorHandler } from "./middleware/error.js";

dotenv.config();

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

app.use("/api/user", userRoutes);
app.use("/api/plan", auth, planRoutes);

app.use(errorLogger);
app.use(errorHandler);

export default app;
