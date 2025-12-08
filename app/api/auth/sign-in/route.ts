import { AuthController } from "@/src/interface-adapters/controller/auth/auth_controller";
import { NextResponse } from "next/server";

export async function POST(req : Request) {

    try{
        
        const {email,password} = await req.json();
        const authController = new AuthController();

        const response = await authController.signIn(email,password);

        return NextResponse.json( response.body,{status : response.status})

    }
    catch(e){

        return NextResponse.json({message : 'Unknown Server Error'},{status : 500});
    }
   
}