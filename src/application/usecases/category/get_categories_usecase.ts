import { ICategoryRepository } from "../../repositories/category/category_repository_interface";

export const getCategoriesUsecase = (repo: ICategoryRepository) => {
  return async () => repo.getCategories();
}
