import { IOAuthRepository } from "../../repositories/auth/oauth_repository_interface";
import { validateInputString } from "../../services/validators";


export const signUpWithOauthUsecase = (repo : IOAuthRepository) => {

    return async (code : string) => {
        validateInputString(code,'code');
        return repo.signUp(code);
    }

}