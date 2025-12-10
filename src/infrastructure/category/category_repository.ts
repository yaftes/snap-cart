import db from "@/drizzle";
import { categoriesTable } from "@/drizzle/schema";
import { ICategoryRepository } from "@/src/application/repositories/category/category_repository_interface";
import { Category } from "@/src/entities/models/category";
import { eq } from "drizzle-orm";
import { ApiError } from "next/dist/server/api-utils";

export class CategoryRepository implements ICategoryRepository {

  
  async create(name: string, description?: string): Promise<Category> {
    
  try {

    const existing = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, name));

    if (existing.length > 0) {
      throw new ApiError(409, "Category with this name already exists");
    }

    const inserted = await db
      .insert(categoriesTable)
      .values({
        name,
        description: description || null,
      })
      .returning();

    return inserted[0];

  } catch (e: any) {
    throw new ApiError(500, e?.message || "Failed to create category");
  }
}


  
  async update(categoryId: string, name: string, description?: string): Promise<Category> {

    try {

      const updated = await db
        .update(categoriesTable)
        .set({
          name,
          description: description || null,
        })
        .where(eq(categoriesTable.id, categoryId))
        .returning();

      if (!updated[0]) {
        throw new ApiError(404, "Category not found");
      }

    return updated[0];

  } catch (e: any) {

    if (e instanceof ApiError) {
      throw e;
    }

    throw new ApiError(500, e?.message || "Failed to update category");
  }
}


  
  async delete(categoryId: string): Promise<void> {
  try {
    const deleted = await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, categoryId))
      .returning();

    if (!deleted.length) {
      throw new ApiError(404, "Category not found");
    }

  } catch (e: any) {
    if (e instanceof ApiError) throw e;

    throw new ApiError(500, e?.message || "Failed to delete category");
  }
}

  
  async getCategory(categoryId: string): Promise<Category> {
  try {
    const category = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, categoryId))
      .limit(1);

    if (!category[0]) {
      throw new ApiError(404, "Category not found");
    }

    return category[0];

  } catch (e: any) {
    if (e instanceof ApiError) throw e;

    throw new ApiError(500, e?.message || "Failed to get category");
  }
}


  
  async getCategories(): Promise<Category[]> {
  try {
    return await db.select().from(categoriesTable);
  } catch (e: any) {
    throw new ApiError(500, e?.message || "Failed to get categories");
    }
  }

  
}
