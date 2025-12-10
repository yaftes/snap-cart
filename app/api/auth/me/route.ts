import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {

  try {

    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, AUTH_SECRET) as any;

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      }
    });

  } catch (err) {
    return NextResponse.json({ user: null }, { status: 402 });
  }
  
}
