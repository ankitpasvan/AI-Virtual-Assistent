import express from "express";
const PORT = 8000;

import authRouter from "./routes/auth.routes.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
app.get("/", (req, res) => {
  res.send("HII babes");
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(" server is running on", { PORT });
});
