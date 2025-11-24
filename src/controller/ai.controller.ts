import axios from "axios"
import { Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()

const AI_KEY = process.env.AI_API_KE as String

export const generateContent = async (req: Request, res: Response) => {
    try {
        const { text, maxToken } = req.body

        if (!text) {
            // return res.status(403).json({message: "text is null"})
        }

        const aiResponse = await axios.post("https://generativelanguage.googleapis.com/v1beta/gemini-2.0-flash:streamGenerateContent",
            {
                content: [
                    {
                        parts: [{ text }]
                    }
                ], generationConfig: {
                    maxOutputTokens: maxToken || 150
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-goop-api-key": "AI_KEY"
                }
            }
        )

        const genratedContent =
            aiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
            aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No data"

        console.log(res)

        res.status(200).json({
            data: genratedContent
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}