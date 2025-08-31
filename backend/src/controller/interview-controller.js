import { v4 as uuidv4 } from "uuid";

import { getAIResponse, removeUser } from "../config/gemini-config.js";
import {
  finalPrompt,
  generateStructuredAnalysisPrompt,
} from "../utils/prompt.js";
import { extractJsonSafely } from "../utils/json-parser.js";

const questionsCount = {};

export const createInterview = async (req, res) => {
  try {
    const { interviewDetails } = req.body;

    // console.log("Request Received : ", req.body);

    if (!interviewDetails?.trim()) {
      return res.status(400).json({
        err: "invalid input.",
        message: "Input must be a valid non-empty string",
        data: {},
        success: false,
      });
    }

    const interviewId = uuidv4();

    const aiResponse = await getAIResponse(interviewId, interviewDetails);
    // console.log("AI Response : ", aiResponse);
    questionsCount[interviewId] = 1;

    res.status(200).json({
      success: true,
      data: {
        id: interviewId,
        text: aiResponse,
      },
      err: "",
      message: "new interview created",
    });
  } catch (error) {
    console.log("Error at Create-Interview Controller : ", error.message);
    return res.status(500).json({
      success: false,
      err: error.message,
      message: "Internal server error",
      data: {},
    });
  }
};

export const generateResponse = async (req, res) => {
  try {
    const id = req.params.id;
    let { message } = req.body;

    if (!id || !message?.trim() || !questionsCount[id]) {
      return res.status(400).json({
        err: "Invalid input",
        message: "Interview ID and Message must be valid",
        data: {},
        success: false,
      });
    }

    let aiResponse = await getAIResponse(id, message);

    let final = false;
    if (questionsCount[id] >= 10) {
      message = finalPrompt;
      aiResponse = await getAIResponse(id, message);
      final = true;
    }

    questionsCount[id]++;

    return res.status(200).json({
      success: true,
      data: {
        text: aiResponse,
        isFinal: final,
      },
      err: "",
      message: "successfully fetched the AI response",
    });
  } catch (error) {
    console.log("Error at generateResponse controller: ", error.message);
    res.status(500).json({
      err: error.message,
      message: "internal server error",
      success: false,
      data: {},
    });
  }
};

export const stopInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!questionsCount[id]) {
      return res.status(200).json({
        success: false,
        data: {},
        err: "Invalid Request",
        message: "Interview ID is not Valid",
      });
    }

    const analysisPrompt = generateStructuredAnalysisPrompt();

    const analysis = await getAIResponse(id, analysisPrompt);

    let parsedAnalysis;
    try {
      // Try extracting JSON from markdown-style code block
      parsedAnalysis = extractJsonSafely(analysis);
    } catch (err) {
      console.log("Failed to parse AI analysis response : ", analysis);
      return res.status(500).json({
        success: false,
        err: "Failed to parse AI analysis response",
        message: "AI response was not valid JSON",
        data: err,
      });
    }

    removeUser(id);
    delete questionsCount[id];

    return res.status(200).json({
      success: true,
      data: {
        parsedAnalysis,
      },
      message: "Analysis Complete",
      err: "",
    });
  } catch (error) {
    console.log("Error at stopInterview controller: ", error.message);
    res.status(500).json({
      err: error.message,
      message: "internal server error",
      success: false,
      data: {},
    });
  }
};
