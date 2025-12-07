
import { IProductRepository } from "../../repositories/product/product_repository_interface";

export const getProductsByCategoryUsecase = (repo : IProductRepository)  => {
    return async () => repo.getProducts();
}