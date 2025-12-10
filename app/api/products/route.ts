import { ProductController } from "@/src/interface-adapters/controller/product/product_controller";
import { NextResponse } from "next/server";

const controller = new ProductController();


export async function GET() {
  try {
    const result = await controller.getProducts();
    return NextResponse.json(result.body,{status : result.status});
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}



export async function POST(req: Request) {

  try {


    const body = await req.json();

    const product = {
      name: body.name,
      description: body.description,
      price: body.price,
      thumbnail_image: body.thumbnail_image,
      stock: body.stock ?? 0,
      available_colors: body.available_colors ?? [],
    };

    const result = await controller.create(body.categoryId, product);
    return NextResponse.json(result.body, { status: result.status });

  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message || "Invalid JSON" },
      { status: 400 }
    );
  }
}

