import IAuthRepository from "@/src/application/repositories/auth/auth_repository_interface";
import { signInUseCase } from "@/src/application/usecases/auth/sign_in_usecase";
import signUpUseCase from "@/src/application/usecases/auth/sign_up_usecase";
import { ApiError } from "@/src/entities/errors/auth_errors";
import { AuthRepository } from "@/src/infrastructure/auth/auth_repository";

export class AuthController {
  
  private repo: IAuthRepository;

  constructor() {
    this.repo = new AuthRepository();
  }

  async signUp(name: string, email: string, password: string) {
    try {
      const usecase = signUpUseCase(this.repo);
      const user = await usecase(name, email, password);

      return {
        status: 201,
        body: {
          message: "User registered successfully",
          data: user,
        },
      };
    } catch (e: any) {
      if (e instanceof ApiError) {
        return {
          status: e.status || 500,
          body: {
            message: e.message || "Failed to register user",
          },
        };
      }
      return {
        status: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }

  async signIn(email: string, password: string) {
    try {
      const usecase = signInUseCase(this.repo);
      const user = await usecase(email, password);

      return {
        status: 200,
        body: {
          message: "User logged in successfully",
          data: user,
        },
      };
    } catch (e: any) {
      if (e instanceof ApiError) {
        return {
          status: e.status || 500,
          body: {
            message: e.message || "Failed to login user",
          },
        };
      }
      return {
        status: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }
}
