import { Router } from "express";
import {
  createInterview,
  generateResponse,
  stopInterview,
} from "../controller/interview-controller.js";

const router = Router();

router.post("/start-interview", createInterview);
router.post("/:id/message", generateResponse);
router.post("/:id/stop-interview", stopInterview);

export default router;
