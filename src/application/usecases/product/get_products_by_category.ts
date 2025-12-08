
import { IProductRepository } from "../../repositories/product/product_repository_interface";
import { validateInputString } from "../../services/validators";

export const getProductsByCategoryUsecase = (repo : IProductRepository)  => {

    return async (categoryId : string) => {
        
        validateInputString(categoryId,'category id');
        return repo.getProducts();
    }
    
}