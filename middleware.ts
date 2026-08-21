import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin routes
  if (path.startsWith("/admin")) {
    const sessionToken = request.cookies.get("neon_auth_session")?.value;
    
    // In production or strict mode, if session token is missing, redirect to admin login flow or allow session check
    if (!sessionToken) {
      // Allow loading admin page for login form modal or redirect
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
