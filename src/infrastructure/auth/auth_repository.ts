import IAuthRepository from "@/src/application/repositories/auth/auth_repository_interface";
import { usersTable } from "../../../drizzle/schema";
import { User } from "@/src/entities/models/user";
import db from "../../../drizzle/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {eq} from "drizzle-orm";

export class AuthRepository implements IAuthRepository {

  async signIn(email: string, password: string): Promise<User> {

    try {

      const existing = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      const user = existing[0];

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      
      const returnedUser: User = {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: "user",
          created_at: user.created_at,
          updated_at: user.updated_at,
          token,
      };

      return returnedUser;

    } catch (e: any) {
      
      throw new Error(e.message || "Sign in failed");
    }
  }

  async signOut(): Promise<void> {
    
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    try {

      let createdUser: any = null;
      
      const hashed = await bcrypt.hash(password, 10);

      
      try {

        const inserted = await db
          .insert(usersTable)
          .values({
            name,
            email,
            password: hashed,
            role: "user",
          })
          .returning();


        createdUser = inserted[0];

      } catch (err: any) {
        
        if (err.message.includes("duplicate key") || err.message.includes("already exists")) {
          throw new Error("User with this email already exists");
        }
        throw err;
      }

      if (!createdUser) {
        throw new Error("User creation failed");
      }

      
      const token = jwt.sign(
        {
          id: createdUser.id,
          email: createdUser.email,
          role: createdUser.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      
      const returnedUser: User = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        created_at: createdUser.created_at,
        updated_at: createdUser.updated_at,
        token,
      };

      return returnedUser;
    } catch (e: any) {
      throw new Error(e.message || "Sign up failed");
    }
  }

}
