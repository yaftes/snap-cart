import { ApiError } from "@/src/entities/errors/auth_errors";
import IAuthRepository from "../../repositories/auth/auth_repository_interface";
import { validateInputString } from "../../services/validators";

export const signInUseCase = (repo: IAuthRepository) => {

  return async (email: string, password: string) => {


    validateInputString(email,'email');
    validateInputString(password,'password');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new ApiError(400,"Invalid email format");
    }

    return repo.signIn(email, password);

  };

};
