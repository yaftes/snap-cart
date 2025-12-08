import { CategoryController } from "@/src/interface-adapters/controller/category/category_controller";
import { NextResponse } from "next/server";

const controller = new CategoryController();


export async function GET() {

  const result = await controller.getCategories();

  return NextResponse.json(result.body, {
    status: result.status,
  });

}


export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { name, description } = body;

    const result = await controller.create(name, description);

    return NextResponse.json(result.body, {
      status: result.status,
    });
    
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }
}
