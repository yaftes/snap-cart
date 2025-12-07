import { Product } from "@/src/entities/models/product";
import { IProductRepository } from "../../repositories/product/product_repository_interface";
import { validateInputString } from "../../services/validators";




export const updateProductUsecase = (repo : IProductRepository)  => {
    return async (product : Product) => {
         if(!product.price) throw new Error('price is required');
            validateInputString(product.id,'id');
            validateInputString(product.name,'name');
            validateInputString(product.description,'description');
            validateInputString(product.thumbnail_image,'thumbnail image');
     return repo.update(product)
    };
}