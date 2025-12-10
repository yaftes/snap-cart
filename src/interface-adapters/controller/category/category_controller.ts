import { createCategoryUsecase } from "@/src/application/usecases/category/create_category_usecase";
import { deleteCategoryUsecase } from "@/src/application/usecases/category/delete_category_usecase";
import { getCategoriesUsecase } from "@/src/application/usecases/category/get_categories_usecase";
import { getCategoryUsecase } from "@/src/application/usecases/category/get_category_usecase";
import { updateCategoryUsecase } from "@/src/application/usecases/category/update_category_usecase";
import { ApiError } from "@/src/entities/errors/auth_errors";
import { CategoryRepository } from "@/src/infrastructure/category/category_repository";

export class CategoryController {

  private repo: CategoryRepository;

  constructor() {
    this.repo = new CategoryRepository();
  }

  
  async create(name: string, description?: string) {
    try {
      const usecase = createCategoryUsecase(this.repo);
      const category = await usecase(name, description ?? "");

      return {
        status: 201,
        body: {
          success: true,
          message: "Category created successfully",
          data: category,
        },
      };

    } catch (e: any) {
      const status = e instanceof ApiError ? e.status : 500;
      const message = e instanceof ApiError ? e.message : "Failed to create category";

      return {
        status,
        body: {
          success: false,
          message,
        },
      };
    }
  }

  async update(id: string, name: string, description?: string) {
    try {
      const usecase = updateCategoryUsecase(this.repo);
      const category = await usecase(id, name, description ?? "");

      return {
        status: 200,
        body: {
          success: true,
          message: "Category updated successfully",
          data: category,
        },
      };

    } catch (e: any) {
      const status = e instanceof ApiError ? e.status : 500;
      const message = e instanceof ApiError ? e.message : "Failed to update category";

      return {
        status,
        body: {
          success: false,
          message,
        },
      };
    }
  }


  async getCategory(id: string) {
    try {
      const usecase = getCategoryUsecase(this.repo);
      const category = await usecase(id);

      return {
        status: 200,
        body: {
          success: true,
          data: category,
        },
      };

    } catch (e: any) {
      const status = e instanceof ApiError ? e.status : 500;
      const message = e instanceof ApiError ? e.message : "Failed to get category";

      return {
        status,
        body: {
          success: false,
          message,
        },
      };
    }
  }

  async getCategories() {
    try {
      const usecase = getCategoriesUsecase(this.repo);
      const categories = await usecase();

      return {
        status: 200,
        body: {
          success: true,
          data: categories,
        },
      };

    } catch (e: any) {
      const status = e instanceof ApiError ? e.status : 500;
      const message = e instanceof ApiError ? e.message : "Failed to get categories";

      return {
        status,
        body: {
          success: false,
          message,
        },
      };
    }
  }


  async delete(id: string) {
    try {
      const usecase = deleteCategoryUsecase(this.repo);
      await usecase(id);

      return {
        status: 200,
        body: {
          success: true,
          message: "Category deleted successfully",
        },
      };

    } catch (e: any) {
      const status = e instanceof ApiError ? e.status : 500;
      const message = e instanceof ApiError ? e.message : "Failed to delete category";

      return {
        status,
        body: {
          success: false,
          message,
        },
      };
    }
  }
}
