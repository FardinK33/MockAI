import dotenv from "dotenv";

dotenv.config();

export const config = {
  GEMINI_KEY: process.env.GEMINI_KEY,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};
