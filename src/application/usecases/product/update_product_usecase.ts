import { Product } from "@/src/entities/models/product";
import { IProductRepository } from "../../repositories/product/product_repository_interface";




export const updateProductUsecase = (repo : IProductRepository)  => {
    return async (product : Product) => repo.update(product);
}