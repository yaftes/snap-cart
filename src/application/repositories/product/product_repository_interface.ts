import { Product } from "@/src/entities/models/product";



export interface IProductRepository {

    create(product : Product) : Promise<Product> ;
    
    update(product : Product) : Promise<Product>;

    delete(productId : string) : Promise<void>;

    getProduct(productId : string) : Promise<Product> ;

    getProducts() : Promise<Product[]>;
    
}