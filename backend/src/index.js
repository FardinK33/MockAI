import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "./config/env-config.js";
import connectToDB from "./db/connectToDB.js";
import { authRoutes, interviewRoutes } from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

app.listen(config.PORT, async () => {
  await connectToDB();
  console.log("Server Started on PORT :", config.PORT);
});
