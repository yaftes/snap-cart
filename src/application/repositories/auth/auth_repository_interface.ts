import { User } from "@/src/entities/models/user";

export default interface IAuthRepository {

  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<User>;
  
}

