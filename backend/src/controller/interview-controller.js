import client from "../config/redis-config.js";
import { getAIResponse, generateAnalysis } from "../config/gemini-config.js";
import {
  finalPrompt,
  generateInitialPrompt,
  noAnalysis,
} from "../utils/prompt.js";
import { extractJsonSafely } from "../utils/json-parser.js";
import Interview from "../models/interview-model.js";
import Conversation from "../models/conversation-model.js";

export const createInterview = async (req, res) => {
  try {
    const { jobRole, experience, jobDescription, interviewType } = req.body;

    const userId = req.user?._id;
    if (
      !jobRole?.trim() ||
      !experience?.trim() ||
      !jobDescription?.trim() ||
      !interviewType?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Input must be a valid non-empty string",
        data: {},
      });
    }

    const newInterview = await Interview.create({
      userId,
      jobRole,
      experience,
      jobDescription,
      interviewType,
    });
    const interviewId = newInterview._id.toString();

    const interviewDetails = generateInitialPrompt(
      jobRole,
      experience,
      jobDescription,
      interviewType
    );

    const aiResponse = await getAIResponse(
      userId,
      interviewId,
      interviewDetails
    );

    await Conversation.create({
      userId,
      interviewId: interviewId,
      role: "ai",
      text: aiResponse,
    });

    await client.set(`user:${userId}:interview:${interviewId}:count`, 1);

    res.status(200).json({
      success: true,
      message: "new interview created",
      data: {
        id: interviewId,
        text: aiResponse,
      },
    });
  } catch (error) {
    console.log("Error at Create-Interview Controller : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

export const generateResponse = async (req, res) => {
  try {
    const { id: interviewId } = req.params;
    const userId = req.user._id;
    const { message } = req.body;

    if (!interviewId || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Interview ID and Message must be valid",
        data: {},
      });
    }

    //`user:${userId}:interview:${interviewId}:count`, 1
    let count = await client.get(
      `user:${userId}:interview:${interviewId}:count`
    );

    if (!count) {
      return res.status(400).json({
        success: false,
        message: "Invalid Interview",
        data: {},
      });
    }

    count = JSON.parse(count);

    await Conversation.create({
      userId,
      interviewId,
      role: "user",
      text: message,
    });

    let final = false;
    if (count >= 10) {
      final = true;
    }

    const aiResponse = await getAIResponse(
      userId,
      interviewId,
      message,
      final && finalPrompt
    );

    await client.incr(`user:${userId}:interview:${interviewId}:count`);

    await Conversation.create({
      userId,
      interviewId,
      role: "ai",
      text: aiResponse,
    });

    return res.status(200).json({
      success: true,
      message: "successfully fetched the AI response",
      data: {
        text: aiResponse,
        isFinal: final,
      },
    });
  } catch (error) {
    console.log("Error at generateResponse controller: ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
      data: {},
    });
  }
};

export const stopInterview = async (req, res) => {
  try {
    const { id: interviewId } = req.params;
    const userId = req.user._id;

    let count = await client.get(
      `user:${userId}:interview:${interviewId}:count`
    );

    if (!count) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is not Valid",
        data: {},
      });
    }

    count = JSON.parse(count);
    if (count < 5) {
      // Deleting interview session from redis
      await client.del(`user:${userId}:interview:${interviewId}:history`);
      await Interview.findOneAndUpdate(
        { _id: interviewId, userId },
        {
          analysis: noAnalysis.analysis,
          overallRating: noAnalysis.overallRating,
        }
      );
      return res.status(200).json({
        success: true,
        message: "Interview Completed",
        data: noAnalysis,
      });
    }

    const analysis = await generateAnalysis(userId, interviewId);

    let parsedAnalysis;
    try {
      // Try extracting JSON from markdown-style code block
      parsedAnalysis = extractJsonSafely(analysis);
    } catch (err) {
      console.log("Failed to parse AI analysis response : ", analysis);
      return res.status(500).json({
        success: false,
        message: analysis,
        data: {},
      });
    }

    await client.del(`user:${userId}:interview:${interviewId}:count`);

    await Interview.findOneAndUpdate(
      { _id: interviewId, userId },
      {
        analysis: parsedAnalysis.analysis,
        overallRating: parsedAnalysis.overallRating,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Analysis Complete",
      data: parsedAnalysis,
    });
  } catch (error) {
    console.log("Error at stopInterview controller: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

export const getAllInterviews = async (req, res) => {
  try {
    const userId = req.user._id;

    const interviews = await Interview.find({ userId }).lean();

    return res.status(200).json({
      success: true,
      message: "Successfully fetched all interviews",
      data: interviews,
    });
  } catch (error) {
    console.log("Error at getAllInterview controller: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
