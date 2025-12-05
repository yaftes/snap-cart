
import IAuthRepository from "@/src/application/repositories/auth/auth_repository_interface";
import { usersTable } from "../../../drizzle/schema";
import db from "../../../drizzle/index";
import { User } from "@/src/entities/models/user";



export class AuthRepository implements IAuthRepository {

  async signIn(email: string, password: string): Promise<User> {

    try {

      const user = db.query.usersTable.findFirst({
        where: (u) => u.email.eq(email),
      });

      if (!user) throw new Error("User not found");

      if (user.password !== password) throw new Error("Invalid password");

     return user as User;
      
    } catch (e) {
      throw new Error("Sign in failed: " + e);
    }


  }

  async signOut(): Promise<void> {
    // implement sign out logic if needed
  }

  async signUp(name: string, email: string, password: string): Promise<void> {
    await db.insert(usersTable).values({
      name,
      email,
      password, // ideally hash this before storing
    });
  }
}
