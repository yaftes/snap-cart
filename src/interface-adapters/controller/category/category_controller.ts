import { CategoryRepository } from "@/src/infrastructure/category/category_repository";

export class CategoryController {
  private repo: CategoryRepository;

  constructor() {
    this.repo = new CategoryRepository();
  }

  
  async create(name: string, description?: string) {
    try {
      const category = await this.repo.create(name,description);

      return {
        status: 201,
        body: {
          success: true,
          message: "Category created successfully",
          data: category,
        },
      };
    } catch (e: any) {
      return {
        status: 500,
        body: {
          success: false,
          message: e?.message || "Failed to create category",
        },
      };
    }
  }

  
  async update(id: string, name: string, description?: string) {
    try {
      const updated = await this.repo.update(
        id,
        name,
        description
      );

      return {
        status: 200,
        body: {
          success: true,
          message: "Category updated successfully",
          data: updated,
        },
      };
    } catch (e: any) {
      return {
        status: 404,
        body: {
          success: false,
          message: e?.message || "Category not found",
        },
      };
    }
  }

  
  async getCategory(id: string) {
    try {
      const category = await this.repo.getCategory(id);

      return {
        status: 200,
        body: {
          success: true,
          data: category,
        },
      };
    } catch (e: any) {
      return {
        status: 404,
        body: {
          success: false,
          message: e?.message || "Category not found",
        },
      };
    }
  }

  
  async getCategories() {
    try {
      const categories = await this.repo.getCategories();

      return {
        status: 200,
        body: {
          success: true,
          data: categories,
        },
      };
    } catch (e: any) {
      return {
        status: 500,
        body: {
          success: false,
          message: e?.message || "Failed to get categories",
        },
      };
    }
  }

  
  async delete(id: string) {
    try {
      await this.repo.delete(id);

      return {
        status: 200,
        body: {
          success: true,
          message: "Category deleted successfully",
        },
      };
    } catch (e: any) {
      return {
        status: 404,
        body: {
          success: false,
          message: e?.message || "Category not found",
        },
      };
    }
  }
}
