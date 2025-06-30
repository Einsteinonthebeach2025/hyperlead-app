// route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use server-side Supabase admin client
const supabase = createClient(
  process.env.SUPABASE_URL, // Use the admin URL, not NEXT_PUBLIC
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper: Parse raw body (for signature verification, if you add it later)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  console.log("hello from paypal webhook [GET]");
  return NextResponse.json({ message: "Webhook GET test OK" });
}
