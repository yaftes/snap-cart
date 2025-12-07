import { ICategoryRepository } from "../../repositories/category/category_repository_interface";


export const deleteCategoryUsecase = (repo : ICategoryRepository)  => {
    return async (categoryId: string) => repo.delete(categoryId);
}