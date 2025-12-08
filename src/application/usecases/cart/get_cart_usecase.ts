import { ICartRepository } from "../../repositories/cart/cart_repository_interface"
import { validateInputString } from "../../services/validators"


export const getCartUsecase = (repo : ICartRepository) => {

    return async (userId : string) => {

        validateInputString(userId,'user Id');

        return repo.getCartByUserId(userId);

    }
}