import { ICartRepository } from "../../repositories/cart/cart_repository_interface";
import { validateInputString } from "../../services/validators";

export const addItemUsecase = (repo : ICartRepository) => {

    return async (cartId : string,productId : string,quantity : number) => {
        if(!quantity) throw new Error('quantity is required');
        validateInputString(cartId,'cart id');
        validateInputString(productId,'product id');
        
        return repo.addItem(cartId,productId,quantity);
    }

}