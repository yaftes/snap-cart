import { ICategoryRepository } from "../../repositories/category/category_repository_interface";


export const getCategoryUsecase = (repo : ICategoryRepository)  => {
    return async (categoryId: string) => repo.getCategory(categoryId);
}