import { ICartRepository } from "../../repositories/cart/cart_repository_interface"
import { validateInputString } from "../../services/validators"

export const updateItemUsecase = (repo : ICartRepository) => {

    return async(itemId : string,quantity : number) => {
        
        validateInputString(itemId,'item id');
        if(!quantity) throw new Error('Quantity is required');

        return repo.updateItemQuantity(itemId,quantity);
    }
}