import { ICategoryRepository } from "../../repositories/category/category_repository_interface";


export const updateCategoryUsecase = (repo : ICategoryRepository)  => {
    return async (categoryId: string,name : string,description? : string) => repo.update(categoryId,name,description);
}