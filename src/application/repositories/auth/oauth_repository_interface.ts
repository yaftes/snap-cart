
import { User } from "@/src/entities/models/user";

export interface IOAuthRepository {
    signIn() : Promise<User>;
    signUp() : Promise<User>;
}