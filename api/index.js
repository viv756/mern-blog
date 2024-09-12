import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
