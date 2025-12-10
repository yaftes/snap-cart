import { AuthController } from "@/src/interface-adapters/controller/auth/auth_controller";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: Request) {

  try {

    const { email, password } = await req.json();
    
    const authController = new AuthController();

    const response = await authController.signIn(email, password);

    if (response.status === 200 && response.body.data?.token) {


      const res = NextResponse.json(response.body, { status: 200 });

      res.headers.set(
        "Set-Cookie",

        serialize("authToken", response.body.data.token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 60,
          path: "/",
        })
      );

      return res;
    }

    return NextResponse.json(response.body, { status: response.status });
  } catch (e) {
    return NextResponse.json({ message: "Unknown Server Error" }, { status: 500 });
  }
}
