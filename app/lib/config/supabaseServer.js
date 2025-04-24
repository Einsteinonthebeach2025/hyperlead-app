"use server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }

  if (!supabaseKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"
    );
  }

  const projectRef = supabaseUrl.split("//")[1].split(".")[0];
  const authCookieName = `sb-${projectRef}-auth-token`;

  const authCookie = cookieStore.get(authCookieName);
  let session = null;

  if (authCookie?.value) {
    try {
      const parsedValue = JSON.parse(authCookie.value);
      session =
        typeof parsedValue === "string" ? JSON.parse(parsedValue) : parsedValue;
    } catch (error) {
      console.error("Error parsing session cookie:", error);
    }
  }

  const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key) => {
          if (key === authCookieName) {
            return authCookie?.value || null;
          }
          return null;
        },
        setItem: (key, value) => {},
        removeItem: (key) => {},
      },
    },
    global: {
      headers: {
        Cookie: cookieStore.toString(),
        Authorization: session?.access_token
          ? `Bearer ${session.access_token}`
          : "",
      },
    },
  });

  if (session) {
    client.auth.setSession(session);
  }

  return client;
}
