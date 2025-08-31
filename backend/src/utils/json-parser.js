// utils/json-parser.js
export const extractJsonSafely = (text) => {
  const jsonMatch = text.match(/```json([\s\S]*?)```/);
  const jsonString = jsonMatch ? jsonMatch[1].trim() : text;
  return JSON.parse(jsonString);
};
