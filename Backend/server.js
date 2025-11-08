import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("HII babes");
});

app.listen(PORT, () => {
  console.log(" server is running on", { PORT });
});
