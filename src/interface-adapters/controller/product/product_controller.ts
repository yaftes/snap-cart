import { createProductUsecase } from "@/src/application/usecases/product/create_product_usecase";
import { deleteProductUsecase } from "@/src/application/usecases/product/delete_product_usecase";
import { getProductUsecase } from "@/src/application/usecases/product/get_product_usecase";
import { getProductsByCategoryUsecase } from "@/src/application/usecases/product/get_products_by_category";
import { getProductsUsecase } from "@/src/application/usecases/product/get_products_usecase";
import { updateProductUsecase } from "@/src/application/usecases/product/update_product_usecase";
import { Product } from "@/src/entities/models/product";
import { ProductRepository } from "@/src/infrastructure/product/product_repository";

export class ProductController {

  private repo: ProductRepository;

  constructor() {

    this.repo = new ProductRepository();

  }


  async create(categoryId: string, product: Product) {
    try {
     
      const usecase = await createProductUsecase(this.repo);
      const createdProduct = usecase(categoryId,product);

        return {
            status: 201,
            body: {
            success: true,
            message: "Product created successfully",
            data: createdProduct,
            },
        };
    
    } catch (e: any) {
      return {
        status: 500,
        body: {
          success: false,
          message: e?.message || "Failed to create product",
        },
      };
    }
  }

 
  async update(product: Product){

    try {

      const usecase = await updateProductUsecase(this.repo);
      const updatedProduct = usecase(product);

      return {
        status: 200,
        body: {
          success: true,
          message: "Category updated successfully",
          data: updatedProduct,
        },
      };
   
    } catch (e: any) {
      return  {
        status: 404,
        body: {
          success: false,
          message: e?.message || "Product not found",
        },
      };
    }
  }


  async delete(productId: string) {
    try {

      const usecase = await deleteProductUsecase(this.repo);
      await usecase(productId);

     return {
        status: 200,
        body: {
          success: true,
          message: "Product deleted successfully",
        },
      };

    } catch (e: any) {
      return {
        status: 404,
        body: {
          success: false,
          message: e?.message || "Product not found",
        },
      };
    }
  }

 
  async getProduct(productId: string) {
    
    try {

        const usecase = await getProductUsecase(this.repo);
        const product =  await usecase(productId);
      
        return {
            status: 200,
            body: {
            success: true,
            data: product,
            },
        };
    } catch (e: any) {
      return {
        status: 404,
        body: {
          success: false,
          message: e?.message || "Product not found",
        },
      };
    }
  }


  async getProducts() {
    try {
        const usecase = await getProductsUsecase(this.repo);
        const products = await usecase();
      return {
        status: 200,
        body: {
          success: true,
          data: products,
        },
      };
    } catch (e: any) {
      return {
        status: 500,
        body: {
          success: false,
          message: e?.message || "Failed to get Products",
        },
      };
    }
  }

  async getProductByCategory(categoryId : string) {
    try{
        const usecase = await getProductsByCategoryUsecase(this.repo);
        const products = await usecase(categoryId);
      return {
        status: 200,
        body: {
          success: true,
          data: products,
        },
      };

    }
    catch(e : any){
    return {
        status: 500,
        body: {
          success: false,
          message: e?.message || "Failed to get Products",
        },
      };
    }
  }


}
