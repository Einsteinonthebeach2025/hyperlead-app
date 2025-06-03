import { generateEmail } from "app/helpers/openAi";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const email = await generateEmail(prompt);
    return NextResponse.json({ email });
  } catch (error) {
    console.error("AI Email error:", error.message);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate email." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
