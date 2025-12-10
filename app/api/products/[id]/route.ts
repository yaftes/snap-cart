import { ProductController } from "@/src/interface-adapters/controller/product/product_controller";
import { NextResponse } from "next/server";

const controller = new ProductController();

// authenticated user

export async function GET(req:Request,{params}: {params : {id : string}}) {
  
  try{

    const { id } = params;
    const result = await controller.getProduct(id);
    return NextResponse.json(result.body,{status : result.status});

  }
  catch(e : any){
    return NextResponse.json({
      success : false,
      message : e.toString() || 'Failed to load the product'
    },{status : 500});
  }
}




// admin

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await controller.delete(id);

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


// admin
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const product = {
      id: id,
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



