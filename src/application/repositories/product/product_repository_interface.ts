import { Product } from "@/src/entities/models/product";


export interface IProductRepository {


    // admin
    create(categoryId : string,product : Product) : Promise<Product> ;
    
    update(product : Product) : Promise<Product>;

    delete(productId : string) : Promise<void>;


    // user & admin

    getProduct(productId : string) : Promise<Product> ;
    
    getProducts() : Promise<Product[]>;

    getProductsByCategory(categoryId : string) : Promise<Product[]>;
    
}