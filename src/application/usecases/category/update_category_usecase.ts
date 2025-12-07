import { ICategoryRepository } from "../../repositories/category/category_repository_interface";
import { validateInputString } from "../../services/validators";


export const updateCategoryUsecase = (repo : ICategoryRepository)  => {
    return async (categoryId: string,name : string,description? : string) => {
        validateInputString(categoryId,'category id');
        validateInputString(name,'name');
        return repo.update(categoryId,name,description);
    } 
}