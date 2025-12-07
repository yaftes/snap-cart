import db from "@/drizzle";
import { categoriesTable } from "@/drizzle/schema";
import { ICategoryRepository } from "@/src/application/repositories/category/category_repository_interface";
import { Category } from "@/src/entities/models/category";
import { eq } from "drizzle-orm";

export class CategoryRepository implements ICategoryRepository {

  
  async create(name: string, description?: string): Promise<Category> {
    try {
      const inserted = await db
        .insert(categoriesTable)
        .values({
          name,
          description: description || null,
        })
        .returning();

      return inserted[0];
    } catch (e: any) {
      throw new Error(e?.message || "Failed to create category");
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
        throw new Error("Category not found");
      }

      return updated[0];
    } catch (e: any) {
      throw new Error(e?.message || "Failed to update category");
    }
  }

  
  async delete(categoryId: string): Promise<void> {
    try {
      const deleted = await db
        .delete(categoriesTable)
        .where(eq(categoriesTable.id, categoryId))
        .returning();

      if (!deleted.length) {
        throw new Error("Category not found");
      }
    } catch (e: any) {
      throw new Error(e?.message || "Failed to delete category");
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
        throw new Error("Category not found");
      }

      return category[0];
    } catch (e: any) {
      throw new Error(e?.message || "Failed to get category");
    }
  }

  
  async getCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categoriesTable);
    } catch (e: any) {
      throw new Error(e?.message || "Failed to get categories");
    }
  }
}
