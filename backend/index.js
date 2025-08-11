import express from "express";
import interviewRoutes from "./routes/interview-routes.js";
import cors from "cors";

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

app.listen(3000, async () => {
  console.log("Server Started on PORT : 3000");
});
