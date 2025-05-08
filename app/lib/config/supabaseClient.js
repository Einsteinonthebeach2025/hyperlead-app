import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

const projectRef = supabaseUrl.split("//")[1].split(".")[0];
const authCookieName = `sb-${projectRef}-auth-token`;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: {
      getItem: (key) => {
        if (typeof window === "undefined") return null;
        if (key === authCookieName) {
          const value = localStorage.getItem(key);
          return value;
        }
        return null;
      },
      setItem: (key, value) => {
        if (typeof window === "undefined") return;
        if (key === authCookieName) {
          localStorage.setItem(key, value);
          document.cookie = `${key}=${value}; path=/; secure; samesite=lax`;
        }
      },
      removeItem: (key) => {
        if (typeof window === "undefined") return;
        if (key === authCookieName) {
          localStorage.removeItem(key);
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      },
    },
  },
});

export default supabase;

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl) {
//   throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
// }

// if (!supabaseKey) {
//   throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
// }

// const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true,
//   },
// });

// export default supabase;
