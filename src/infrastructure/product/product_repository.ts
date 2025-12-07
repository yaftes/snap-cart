import db from "@/drizzle";
import { productsTable } from "../../../drizzle/schema";
import { IProductRepository } from "@/src/application/repositories/product/product_repository_interface";
import { Product } from "@/src/entities/models/product";
import { eq } from "drizzle-orm";



export class ProductRepository implements IProductRepository {
  
  
  async create(categoryId : string,product: Product): Promise<Product> {

    try {

      const inserted = await db
        .insert(productsTable)
        .values({

          // these fields are required 
          name : product.name,
          description: product.description,
          price: product.price,
          thumbnail_image: product.thumbnail_image,
          category_id: categoryId,

          // optional
          stock: product.stock ?? 0,
          available_colors : product.available_colors ?? [],
        })
        .returning();

      return inserted[0];
    } catch (e: any) {
      throw new Error(e?.message || "Failed to create product");
    }
  }

  
  async update(product: Product): Promise<Product> {

    try {

      const updated = await db
        .update(productsTable)
        .set({

          name: product.name,
          description: product.description,
          price: product.price,
          thumbnail_image: product.thumbnail_image,


          stock: product.stock ?? 0,
          available_colors : product.available_colors ?? []
        })
        .where(eq(productsTable.id, product.id!))
        .returning();

      if (!updated[0]) {
        throw new Error("Product not found");
      }

      return updated[0];

    } catch (e: any) {

      throw new Error(e?.message || "Failed to update product");

    }
  }

  
  async delete(productId: string): Promise<void> {

    try {

      const deleted = await db
        .delete(productsTable)
        .where(eq(productsTable.id, productId))
        .returning();

      if (!deleted.length) {
        throw new Error("Product not found");
      }

    } catch (e: any) {

      throw new Error(e?.message || "Failed to delete product");

    }
  }



  
  async getProduct(productId: string): Promise<Product> {

    try {

      const product = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, productId))
        .limit(1);

      if (!product[0]) {
        throw new Error("Product not found");
      }

      return product[0];
    } catch (e: any) {
      throw new Error(e?.message || "Failed to get product");
    }
  }

  
  async getProducts(): Promise<Product[]> {

    try {
      return await db.select().from(productsTable);
    } catch (e: any) {
      throw new Error(e?.message || "Failed to get products");
    }

  }

async getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    return await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category_id, categoryId));
  } catch (e: any) {
    throw new Error(e?.message || 'Failed to get products');
  }
}


}
