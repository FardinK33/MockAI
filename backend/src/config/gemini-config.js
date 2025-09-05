import { GoogleGenAI } from "@google/genai";

import {
  generateStructuredAnalysisPrompt,
  systemPrompt,
} from "../utils/prompt.js";
import { config } from "./env-config.js";
import client from "./redis-config.js";
import redisUtils from "../utils/redis-utils.js";

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_KEY,
});

export async function getAIResponse(userId, interviewId, userMessage, prompt) {
  // Retrieving the Session history with user id to continue interview with context
  let history = [];
  const cachedHistory = await client.get(
    redisUtils.getHistoryKey(userId, interviewId)
  );
  if (cachedHistory) history = JSON.parse(cachedHistory);

  if (userMessage)
    history.push({ role: "user", parts: [{ text: userMessage }] });

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: systemPrompt,
    },
    history,
  });

  const response = await chat.sendMessage({
    message: prompt ? prompt : userMessage,
  });

  history.push({ role: "model", parts: [{ text: response.text }] });

  await client.setEx(
    redisUtils.getHistoryKey(userId, interviewId),
    60 * 30,
    JSON.stringify(history)
  );

  return response.text;
}

export async function generateAnalysis(userId, interviewId) {
  const analysisPrompt = generateStructuredAnalysisPrompt;
  const aiResponse = await getAIResponse(
    userId,
    interviewId,
    "",
    analysisPrompt
  );

  await client.del(redisUtils.getHistoryKey(userId, interviewId));

  return aiResponse;
}
