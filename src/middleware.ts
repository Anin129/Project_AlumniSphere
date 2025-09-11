// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Example cookie check (adjust key to your session cookie name)
    const token = req.cookies.get("next-auth.session-token")?.value;
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
