import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose.connect(
  process.env.DATABASE_URL //, { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", error => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo DB");
});

const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));

import postRouter from "./routes/post_route";
app.use("/post", postRouter);

export default app;
