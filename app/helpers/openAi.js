import OpenAI from "openai";
import { emailSystemContent } from "./aiSystemRules";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateEmail = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini-2025-04-14",
    messages: [
      {
        role: "system",
        content: emailSystemContent,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
};
