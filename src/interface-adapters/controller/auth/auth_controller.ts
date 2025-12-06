import signUpUseCase from "@/src/application/usecases/auth/sign_up_usecase";
import { ApiResponse } from "@/src/entities/models/api_response";
import { AuthRepository } from "@/src/infrastructure/auth/auth_repository";

export class AuthController {
  
  private repo: AuthRepository;

  constructor() {
    this.repo = new AuthRepository();
  }

  async signUp(name: string, email: string, password: string): Promise<ApiResponse> {
    
    try {
      const usecase = signUpUseCase(this.repo);
      const user = await usecase(name, email, password);

      return {
        status_code: 201,
        message: "User registered successfully",
        data: user
      };

    } catch (e: any) {
      return {
        status_code: 400,
        message: e.message || "Failed to register user"
      };
    }
  }


}
