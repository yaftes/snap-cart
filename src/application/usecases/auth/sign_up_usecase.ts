import IAuthRepository from "../../repositories/auth/auth_repository_interface";

 const signUpUseCase = (repo: IAuthRepository) => {
  return async (name: string, email: string, password: string) => {

    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }

    if (name.trim().length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }

    if (!email || email.trim().length === 0) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    if (!password || password.trim().length === 0) {
      throw new Error("Password is required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    return repo.signUp(name.trim(), email.trim().toLowerCase(), password);
  };

};

export default signUpUseCase;
