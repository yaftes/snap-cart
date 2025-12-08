import { ICartRepository } from "../../repositories/cart/cart_repository_interface";


export const getItemsUsecase  = (repo : ICartRepository) => {
    return async (cartId : string) => {
        return repo.getCartItems(cartId);
    };
}