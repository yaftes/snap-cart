import { ProductController } from "@/src/interface-adapters/controller/product/product_controller";
import { NextResponse } from "next/server";

const controller = new ProductController();


// authenticated user only
export async function GET(req:Request, { params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const result = await controller.getProductByCategory(id);
        return NextResponse.json(result.body, { status: result.status }); 
    }
    catch(e : any){
        return NextResponse.json(
      { success: false, message: e.message || "Invalid JSON" },
      { status: 400 }
    );
    }
}





