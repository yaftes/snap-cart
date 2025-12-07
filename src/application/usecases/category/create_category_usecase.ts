import { ICategoryRepository } from "../../repositories/category/category_repository_interface";


export const createCategoryUsecase = (repo : ICategoryRepository)  => {
    return async (name : string,description : string) => repo.create(name,description);
}