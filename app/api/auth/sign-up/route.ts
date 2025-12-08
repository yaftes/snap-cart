import { AuthController } from "@/src/interface-adapters/controller/auth/auth_controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { name, email, password } = await req.json();

    const authController = new AuthController();
    const response = await authController.signUp(name, email, password);


    return NextResponse.json(response.body, {
      status: response.status,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
         message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
    
  }

}
