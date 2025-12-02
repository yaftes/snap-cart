import IAuthRepository from "../../repositories/auth/auth_repository_interface";

export const signUpUseCase = (repo: IAuthRepository) => {
  return async (name: string, email: string, password: string) => {
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (password.length < 6) throw new Error("Password too short");

    return repo.signUp(name, email, password);
  };
};
