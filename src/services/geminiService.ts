import { GoogleGenAI } from "@google/genai";
import { UserStats, Difficulty, StatCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const suggestQuests = async (stats: UserStats) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As a Solo Leveling System AI, suggest 3 daily quests for a player with these stats: 
    Strength: ${stats.strength}, Intelligence: ${stats.intelligence}, Discipline: ${stats.discipline}, Social: ${stats.social}.
    Focus on improving the weakest areas.
    Return the response as a JSON array of objects with 'title', 'difficulty' (easy/medium/hard), and 'category' (strength/intelligence/discipline/social).`,
    config: {
      responseMimeType: "application/json"
    }
  });

  const response = await model;
  return JSON.parse(response.text || '[]');
};

export const analyzeStats = async (stats: UserStats) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze these RPG stats and provide a short motivational summary and one key area to focus on:
    Strength: ${stats.strength}, Intelligence: ${stats.intelligence}, Discipline: ${stats.discipline}, Social: ${stats.social}.
    Keep it in the theme of Solo Leveling.`,
  });

  const response = await model;
  return response.text;
};
