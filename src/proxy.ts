import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AuthRoutes = ["/auth/login", "/auth/signup"];
const adminRoutes = ["/admin"];
const instructorRoutes = ["/instructor"];
const studentRoutes = ["/student"];
const protectedRoutes = [...adminRoutes, ...instructorRoutes, ...studentRoutes];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  // validate token with secret key

  const secretKey = process.env.JWT_SECRET || "your_secret_key";
  // If an access token exists, verify it. If verification fails, redirect to signin.
  if (session) {
    try {
      jwt.verify(session, secretKey);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // clear the invalid token cookie
      const response = NextResponse.redirect(new URL("/auth/login", request.url));

      response.cookies.delete("session");
      return response;
    }
  }

  // If no access token, redirect to signin unless it's an auth route
  if (!session) {
    if (AuthRoutes.includes(pathname) || pathname.startsWith("/auth")) {
      return NextResponse.next();
    } else if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Decode the token to determine the role
  let decodedData = null;
  if (session) {
    decodedData = jwtDecode(session) as { role: string };
  }
  const role = decodedData?.role;

  // // Allow access to admin routes only for admin role
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "admin" || role === "super_admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  // Allow access to instructor routes only for instructor role
  if (instructorRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "instructor") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Allow access to student routes only for student role
  if (studentRoutes.some((route) => pathname.startsWith(route))) {
    if (role === "student") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // For other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/moderator/:path*",
    "/student/:path*",
    "/auth/:path*",
    "/unauthorized",
    "/profile",
  ],
};
