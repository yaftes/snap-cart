
import { User } from "@/src/entities/models/user";


export interface IOAuthRepository {
    signIn(code : string) : Promise<User>;
    signUp(code : string) : Promise<User>;
}