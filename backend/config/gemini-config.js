import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { systemPrompt } from "../utils/prompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

// Simple in-memory session manager
const sessions = new Map();
// const conversations = {};

function getChatForUser(userId) {
  if (!sessions.has(userId)) {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      history: [],
    });
    sessions.set(userId, chat);
  }
  return sessions.get(userId);
}

export async function getAIResponse(userId, userMessage) {
  // Retrieving the Session Instance with user id to continue interview with context
  const chat = getChatForUser(userId);
  const response = await chat.sendMessage({
    message: userMessage,
  });

  return response.text;
}

export async function removeUser(userId) {
  sessions.delete(userId);
  // delete conversations[userId];
}
