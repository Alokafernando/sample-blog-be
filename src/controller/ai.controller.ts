import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const AI_KEY = process.env.AI_API_KEY as string; // Ensure .env has AI_API_KEY

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { text, maxToken } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const aiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateText",
      {
        content: [{ type: "TEXT", text }],
        generationConfig: { maxOutputTokens: maxToken || 150 }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": AI_KEY
        }
      }
    );

    const generatedContent =
      aiResponse.data?.candidates?.[0]?.content?.[0]?.text || "No data";

    res.status(200).json({ data: generatedContent });
  } catch (err: any) {
    console.error("AI generation error:", err.response?.data || err.message);
    res.status(500).json({
      message: "AI generation failed",
      error: err.response?.data || err.message
    });
  }
};
