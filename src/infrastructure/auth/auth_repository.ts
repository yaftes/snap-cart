import IAuthRepository from "@/src/application/repositories/auth/auth_repository_interface";
import { usersTable } from "../../../drizzle/schema";
import { User } from "@/src/entities/models/user";
import db from "../../../drizzle/index";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthRepository implements IAuthRepository {
  
  async signIn(email: string, password: string): Promise<User> {
    throw new Error();
  }

  async signOut(): Promise<void> {}

  async signUp(name: string, email: string, password: string): Promise<User> {
    try {
      let createdUser: any = null;

      await db.transaction(async (tx) => {
        const existing = await tx
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        if (existing.length > 0) {
          throw new Error("User with this email already exists");
        }

  
        const hashed = await bcrypt.hash(password, 10);

        const inserted = await tx
          .insert(usersTable)
          .values({
            name,
            email,
            password: hashed,
            role: "user",
          })
          .returning();

        createdUser = inserted[0];
      });

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
