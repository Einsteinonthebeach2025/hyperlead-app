import OpenAI from "openai";
import { chatbotSystemContent, emailSystemContent } from "./aiSystemRules";
import { appFeatures } from "./chatbotKnowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// EMAIL ASSISTANT AI
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
  return response.choices[0].message.content.trim();
};

// Helper to normalize strings (lowercase, trim, remove punctuation)
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/gi, "")
    .trim();
}

// CHAT ASSISTANT for semantic matching
export const findBestMatchingTrigger = async (userMessage, triggers) => {
  const userPrompt = `User message: "${userMessage}"
Triggers: [\n${triggers.map((t) => '  "' + t + '"').join(",\n")}\n]
Return the trigger from the list that is most similar in meaning to the user's message. If none are similar, return "none".`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini-2025-04-14",
    messages: [
      { role: "system", content: chatbotSystemContent },
      { role: "user", content: userPrompt },
    ],
    temperature: 0,
    max_tokens: 100,
  });
  const match = response.choices[0].message.content.trim();

  if (match && match !== "none") {
    // Try to find a close match in triggers (case/punctuation insensitive)
    const normMatch = normalize(match);
    const found = triggers.find((t) => normalize(t) === normMatch);
    if (found) return found;
  }
  return null;
};

// CHAT ASSISTANT for paraphrasing answer
export const paraphraseAnswer = async (answer, userQuestion) => {
  const prompt = `
App features:
${appFeatures}
A user asked: "${userQuestion}"
Here is the answer you must base your response on: "${answer}"
Please rephrase this answer in your own words, keep the meaning and context, and make it sound natural and conversational.
  `;
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini-2025-04-14",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 200,
    temperature: 0.7,
  });
  return response.choices[0].message.content.trim();
};

// CHAT ASSISTANT for general AI answers or polite rejections
export const generateChatCompletion = async (message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini-2025-04-14",
    messages: [
      { role: "system", content: chatbotSystemContent },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });
  return response.choices[0].message.content.trim();
};
