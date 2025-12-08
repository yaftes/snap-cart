import { ICategoryRepository } from "../../repositories/category/category_repository_interface";
import { validateInputString } from "../../services/validators";


export const createCategoryUsecase = (repo : ICategoryRepository)  => {

    return async (name : string,description : string) => {
        // validate inputs here
        validateInputString(name,'name');
        return repo.create(name,description);
    };
}