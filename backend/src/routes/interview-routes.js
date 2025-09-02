import { Router } from "express";

import {
  createInterview,
  generateResponse,
  getAllInterviews,
  stopInterview,
} from "../controller/interview-controller.js";
import prtotectRoute from "../middleware/protect-route.js";

const router = Router();

router.get("/get-all", prtotectRoute, getAllInterviews);
router.post("/start-interview", prtotectRoute, createInterview);
router.post("/:id/message", prtotectRoute, generateResponse);
router.post("/:id/stop-interview", prtotectRoute, stopInterview);

export default router;
