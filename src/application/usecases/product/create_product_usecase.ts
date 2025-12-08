import { Product } from "@/src/entities/models/product";
import { IProductRepository } from "../../repositories/product/product_repository_interface";
import { validateInputString } from "../../services/validators";


export const createProductUsecase = (repo : IProductRepository)  => {

    return async (categoryId : string,product : Product) => {

        if(!product.price) throw new Error('price is required');

        validateInputString(categoryId,'category id');
        validateInputString(product.name,'name');
        validateInputString(product.description,'description');
        validateInputString(product.thumbnail_image,'thumbnail image');

       return repo.create(categoryId,product);
    } 

}