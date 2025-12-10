import { ApiError } from "@/src/entities/errors/auth_errors";
import IAuthRepository from "../../repositories/auth/auth_repository_interface";
import { validateInputString } from "../../services/validators";

 const signUpUseCase = (repo: IAuthRepository) => {
  
  return async (name: string, email: string, password: string) => {

    validateInputString(name,'name');
    validateInputString(email,'email');
    validateInputString(password,'password');

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new ApiError(400,"Invalid email format");
    }


    if (password.length < 6) {
      throw new ApiError(400,"Password must be at least 6 characters long");
    }

    return repo.signUp(name.trim(), email.trim().toLowerCase(), password);
  };

};

export default signUpUseCase;
