import { IProductRepository } from "../../repositories/product/product_repository_interface";
import { validateInputString } from "../../services/validators";

export const getProductUsecase = (repo : IProductRepository)  => {
    
    return async (productId : string) => {
        validateInputString(productId,'product id');
        return repo.getProduct(productId);
    };

}