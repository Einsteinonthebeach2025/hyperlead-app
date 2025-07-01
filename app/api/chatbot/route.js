import { NextResponse } from "next/server";
import { chatbotKnowledge } from "app/helpers/chatbotKnowledge";
import {
  findBestMatchingTrigger,
  paraphraseAnswer,
  generateChatCompletion,
} from "app/helpers/openAi";

// In-memory store for recent questions (for demo; use session/user ID in production)
let recentQuestions = {};

export async function POST(req) {
  try {
    const { message, userId = "default" } = await req.json();
    for (const item of chatbotKnowledge) {
      const match = await findBestMatchingTrigger(message, item.triggers);
      if (match) {
        // Check if user asked a similar question recently
        if (recentQuestions[userId] && recentQuestions[userId] === match) {
          // Paraphrase the answer
          const paraphrased = await paraphraseAnswer(item.answer);
          recentQuestions[userId] = match;
          return NextResponse.json({
            answer: paraphrased,
            source: "knowledge-paraphrased",
          });
        } else {
          recentQuestions[userId] = match;
          // Always return the exact ANSWER for the first match
          return NextResponse.json({
            answer: item.answer,
            source: "knowledge",
          });
        }
      }
    }
    // Fallback: general AI answer (will politely reject if irrelevant)
    const answer = await generateChatCompletion(message);
    if (!answer || !answer.trim()) {
      return NextResponse.json({
        answer:
          "Sorry, I can only help with questions related to HyperLead. Please let me know if you have any issues or questions about HyperLead!",
        source: "openai",
      });
    }
    return NextResponse.json({ answer, source: "openai" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get answer." },
      { status: 500 }
    );
  }
}
