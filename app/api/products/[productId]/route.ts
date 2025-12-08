import { ProductController } from "@/src/interface-adapters/controller/product/product_controller";
import { NextResponse } from "next/server";

const controller = new ProductController();


export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    const result = await controller.delete(productId);

    return NextResponse.json(result.body, {
      status: result.status,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const body = await req.json();

    const product = {
      id: productId,
      name: body.name,
      description: body.description,
      price: body.price,
      thumbnail_image: body.thumbnail_image,
      stock: body.stock ?? 0,
      available_colors: body.available_colors ?? [],
    };

    const result = await controller.update(product);

    return NextResponse.json(result.body, {
      status: result.status,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message || "Failed to update product" },
      { status: 500 }
    );
  }

}



