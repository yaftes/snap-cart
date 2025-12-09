import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.JWT_SECRET!;

const publicRoutes = ["/api/auth/sign-in", "/api/auth/sign-up"];

const adminRoutes = ["/api/categories"];

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;


  if (publicRoutes.some(route => pathname.startsWith(route))) {
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

    if (adminRoutes.some(route => pathname.startsWith(route))) {
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
