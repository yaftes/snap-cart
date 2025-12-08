import { ICartRepository } from "../../repositories/cart/cart_repository_interface";
import { validateInputString } from "../../services/validators"


export const createCartUsecase = (repo : ICartRepository) => {

    return async (userId : string) => {
        validateInputString(userId,'user id');
        return repo.createCart(userId);
    }
}