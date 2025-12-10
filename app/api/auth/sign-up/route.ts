import { AuthController } from "@/src/interface-adapters/controller/auth/auth_controller";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { name, email, password } = await req.json();

    const authController = new AuthController();

    const response = await authController.signUp(name, email, password);

    const res = NextResponse.json(response.body, {
      status: response.status,
    });

    if(response.body.data?.token){
      
      res.headers.set(
            "Set-Cookie",
            serialize("authToken", response.body.data?.token!, {
              httpOnly: true,
              secure: false,
              sameSite: "strict",
              maxAge: 60 * 60,
              path: "/",
            })
          );
    }

    return res;


  } catch (error: any) {

    return NextResponse.json(
      {
         message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
    
  }

}
