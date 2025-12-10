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



export default function proxy(req: NextRequest) {

  const pathname = req.nextUrl.pathname;
  const method = req.method;

  
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  
  if (isUserGetRoute(pathname, method)) {
    return NextResponse.next();
  }

  
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );

  }

  try {

    const decoded = jwt.verify(token, AUTH_SECRET) as any;

    
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);
    requestHeaders.set("x-user-role", decoded.role);

    
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {

      return NextResponse.redirect(new URL("/auth/sign-in", req.url));

    }

    

    
    const isAdminApiRoute =
      pathname.startsWith("/api/products") ||
      pathname.startsWith("/api/categories");

    if (isAdminApiRoute && method !== "GET") {
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
  matcher: ["/api/:path*", "/admin/:path*"],
};
