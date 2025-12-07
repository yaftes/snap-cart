import { Category } from "@/src/entities/models/category";


export interface ICategoryRepository {

    create(name : string,description? : string) : Promise<Category> ;

    update(categoryId : string,name : string,description ? : string) : Promise<Category>;

    delete(categoryId : string) : Promise<void>;


    getCategory(categoryId : string) : Promise<Category> ;

    getCategories() : Promise<Category[]>;

}