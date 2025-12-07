import { CategoryController } from "@/src/interface-adapters/controller/category/category_controller";
import { NextResponse } from "next/server";

const controller = new CategoryController();


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) 
{
  const result = await controller.getCategory(params.id);

  return NextResponse.json(result.body, {
    status: result.status,
  });
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, description } = body;

    const result = await controller.update(params.id, name, description);

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


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const result = await controller.delete(params.id);

  return NextResponse.json(result.body, {
    status: result.status,
  });
  
}
