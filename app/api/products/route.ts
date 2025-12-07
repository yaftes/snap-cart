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