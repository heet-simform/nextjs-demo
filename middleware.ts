// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("currentUser");
  // Public routes that don't require authentication
  const publicRoutes = ["/login"];

  // Handle redirection for authenticated users trying to access public routes
  if (publicRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  // Handle redirection for unauthenticated users trying to access protected routes
  if (!publicRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
