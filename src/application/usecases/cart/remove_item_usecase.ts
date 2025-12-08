import { ICartRepository } from "../../repositories/cart/cart_repository_interface";
import { validateInputString } from "../../services/validators";

export const removeItemUsecase = (repo : ICartRepository) => {

    return async (itemId : string) => {
        
        validateInputString(itemId,'item id');
        return repo.removeItem(itemId);
    }

}