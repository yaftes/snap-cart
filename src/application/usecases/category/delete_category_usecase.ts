import { ICategoryRepository } from "../../repositories/category/category_repository_interface";
import { validateInputString } from "../../services/validators";


export const deleteCategoryUsecase = (repo : ICategoryRepository)  => {
    return async (categoryId: string) => {
        validateInputString(categoryId,'category id');
        return repo.delete(categoryId);
    } 
}