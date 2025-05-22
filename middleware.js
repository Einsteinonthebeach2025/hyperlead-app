import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const res = NextResponse.next();
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;
  const protectedRoutes = [
    "/dashboard",
    "/administration",
    "/myprofile",
    "/preferences",
    "/regions",
  ];
  // Check if the current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // If it's a protected route and there's no session, redirect to home
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  }
  return res;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/administration/:path*",
    "/myprofile/:path*",
    "/preferences/:path*",
    "/regions/:path*",
  ],
};
