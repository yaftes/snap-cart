import IAuthRepository from "../../repositories/auth/auth_repository_interface";

export const signInUseCase = (repo: IAuthRepository) => {

  return async (email: string, password: string) => {

    if (!email || email.trim().length === 0) {
      throw new Error("Email is required");
    }
    if (!password || password.trim().length === 0) {
      throw new Error("Password is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    return repo.signIn(email, password);

  };

};
