import { NextResponse } from "next/server";
import { chatbotKnowledge } from "app/helpers/chatbotKnowledge";
import { addUnansweredQuestion } from "app/lib/actions/chatStatsActions";
import {
  findBestMatchingTrigger,
  paraphraseAnswer,
  generateChatCompletion,
} from "app/helpers/openAi";

let recentQuestions = {};

export async function POST(req) {
  try {
    const { message, userId = "default", userEmail } = await req.json();
    for (const item of chatbotKnowledge) {
      const match = await findBestMatchingTrigger(message, item.triggers);
      if (match) {
        // Always paraphrase the answer for any matched trigger
        const paraphrased = await paraphraseAnswer(item.answer, message);
        recentQuestions[userId] = match;
        return NextResponse.json({
          answer: paraphrased,
          source: "knowledge-paraphrased",
        });
      }
    }
    // Fallback: general AI answer (will politely reject if irrelevant)
    const answer = await generateChatCompletion(message);
    if (!answer || !answer.trim()) {
      if (userId !== "default" && userEmail) {
        await addUnansweredQuestion(userId, userEmail, message);
      }

      return NextResponse.json({
        answer:
          "Sorry, I can only help with questions related to HyperLead. Please let me know if you have any issues or questions about HyperLead!",
        source: "openai",
      });
    }

    // Check if the answer is a polite rejection (you can customize this logic)
    const rejectionKeywords = [
      "sorry",
      "can't help",
      "only help",
      "related to",
      "not able",
      "unfortunately",
      "don't have",
      "not available",
      "assist you with HyperLead-related questions",
      "If you have any questions about HyperLead, feel free to ask",
    ];

    let isRejection = rejectionKeywords.some((keyword) =>
      answer.toLowerCase().includes(keyword.toLowerCase())
    );

    // New: Also treat as rejection if answer contains the redirect and question is not about HyperLead
    if (
      !isRejection &&
      answer
        .toLowerCase()
        .includes("if you have any questions related to hyperlead") &&
      !message.toLowerCase().includes("hyperlead")
    ) {
      isRejection = true;
    }

    // Track unanswered questions that result in polite rejections
    if (isRejection && userId !== "default" && userEmail) {
      console.log("DEBUG: Calling addUnansweredQuestion", {
        userId,
        userEmail,
        message,
      });
      await addUnansweredQuestion(userId, userEmail, message);
      console.log("DEBUG: addUnansweredQuestion called");
    }

    console.log("DEBUG: Checking for rejection", {
      answer,
      message,
      isRejection,
      userId,
      userEmail,
    });

    return NextResponse.json({ answer, source: "openai" });
  } catch (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: "Failed to get answer." },
      { status: 500 }
    );
  }
}
