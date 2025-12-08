import { IOAuthRepository } from "../../repositories/auth/oauth_repository_interface";
import { validateInputString } from "../../services/validators";

export const signInWithOauthUsecase = (repo : IOAuthRepository) => {

    return async (code : string) => {
        validateInputString(code,'code');
        return repo.signIn(code);
    }
}