import { AuthController } from "@/src/interface-adapters/controller/auth/auth_controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : Request) {

    try{
        
        const {email,password} = await req.json();
        const authController = new AuthController();

        const response = await authController.signIn(email,password);

        const responsebody : any = {
            message : response.message,
        }
        if(response.data) responsebody.data = response.data;

        return NextResponse.json( responsebody,{status : response.status_code})

    }
    catch(e){

        return NextResponse.json({message : 'Unknown Server Error'},{status : 500});
    }
   
}