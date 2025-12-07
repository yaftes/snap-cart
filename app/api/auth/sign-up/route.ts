import { AuthController } from "@/src/interface-adapters/controller/auth/auth_controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const authController = new AuthController();
    const response = await authController.signUp(name, email, password);

    const responseBody: any = {
      message: response.message,
    };

    if (response.data !== undefined && response.data !== null) {
      responseBody.data = response.data;
    }

    return NextResponse.json(responseBody, {
      status: response.status_code,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
