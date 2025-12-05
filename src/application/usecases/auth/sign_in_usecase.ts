import IAuthRepository from "../../repositories/auth/auth_repository_interface";

export const signInUseCase = (repo: IAuthRepository) => {

  return async (email: string, password: string) => {

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    return repo.signIn(email, password);

  };

};
