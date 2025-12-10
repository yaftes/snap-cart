import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.JWT_SECRET!;

const publicRoutes = [
  "/api/auth/sign-in",
  "/api/auth/sign-up",
];


function isUserGetRoute(pathname: string, method: string) {
  
  if (method !== "GET") return false;

  return (
    pathname.startsWith("/api/products") ||
    pathname.startsWith("/api/categories")
  );
}



export function proxy(req: NextRequest) {

  const pathname = req.nextUrl.pathname;
  const method = req.method;

  
  if (
    publicRoutes.some(route => pathname.startsWith(route)) ||
    isUserGetRoute(pathname, method)
  ) {
    return NextResponse.next();
  }

  
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, AUTH_SECRET) as any;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);
    requestHeaders.set("x-user-role", decoded.role);

    
    const isAdminRoute =
      pathname.startsWith("/api/categories") ||
      pathname.startsWith("/api/products");

    if (isAdminRoute && method !== "GET") {
      if (decoded.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "Forbidden: Admins only" },
          { status: 403 }
        );
      }
    }

    
    return NextResponse.next({
      request: { headers: requestHeaders },
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}



export const config = {
  matcher: "/api/:path*",
};
