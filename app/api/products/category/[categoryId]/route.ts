import { ProductController } from "@/src/interface-adapters/controller/product/product_controller";
import { NextResponse } from "next/server";

const controller = new ProductController();


export async function POST(req: Request, { params }: { params: { categoryId: string } }) {

  try {

    const { categoryId } = params; 
    const body = await req.json();

    const product = {
      name: body.name,
      description: body.description,
      price: body.price,
      thumbnail_image: body.thumbnail_image,
      stock: body.stock ?? 0,
      available_colors: body.available_colors ?? [],
    };

    const result = await controller.create(categoryId, product);
    return NextResponse.json(result.body, { status: result.status });

  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message || "Invalid JSON" },
      { status: 400 }
    );
  }
}


export async function GET(req:Request, { params }: { params: { categoryId: string } }) {
    try{

        const { categoryId } = params;
        const result = await controller.getProductByCategory(categoryId);

        return NextResponse.json(result.body, { status: result.status }); 

    }
    catch(e : any){
        return NextResponse.json(
      { success: false, message: e.message || "Invalid JSON" },
      { status: 400 }
    );

    }
}





