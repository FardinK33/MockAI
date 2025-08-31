import express from "express";
import cors from "cors";

import { config } from "./config/env-config.js";
import connectToDB from "./db/connectToDB.js";
import interviewRoutes from "./routes/interview-routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
// '/api/auth'
// '/api/interview
//      /interview/start-interview
//                /:id/message -> get user's response
//                /:id/stop-interview -> manually stoping the interview

app.use("/api/interview", interviewRoutes);

app.listen(config.PORT, async () => {
  await connectToDB();
  console.log("Server Started on PORT :", config.PORT);
});
