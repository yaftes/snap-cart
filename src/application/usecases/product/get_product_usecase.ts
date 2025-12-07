import { IProductRepository } from "../../repositories/product/product_repository_interface";

export const getProductUsecase = (repo : IProductRepository)  => {
    return async (productId : string) => repo.getProduct(productId);
}