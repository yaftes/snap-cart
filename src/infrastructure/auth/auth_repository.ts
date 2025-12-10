import IAuthRepository from "@/src/application/repositories/auth/auth_repository_interface";
import { usersTable } from "../../../drizzle/schema";
import { User } from "@/src/entities/models/user";
import db from "../../../drizzle/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {eq} from "drizzle-orm";
import { ApiError } from "next/dist/server/api-utils";

export class AuthRepository implements IAuthRepository {

  async signIn(email: string, password: string): Promise<User> {


    try {

      const existing = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      const user = existing[0];

      console.log(`${existing.length} CURRENT LENGTH`);

      if (!user) {
        throw new ApiError(401,"Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, user.password!);

      if (!isMatch) {
        throw new ApiError(401,"Invalid email or password");
      }

      if(!user.is_verified) {
        throw new ApiError(403,"Verify your account first please");
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
          name: user.name!,
          email: user.email,
          role: user.role ?? 'user',
          created_at: user.created_at,
          updated_at: user.updated_at,
          token,
      };

      return returnedUser;

    } catch (e: any) {
      
      throw new ApiError(500,"Sign in failed");
    }
  }



  async signOut(): Promise<void> {
    
  }

  async signUp(name: string, email: string, password: string): Promise<User> {

  try {

  
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));


    if (existingUser.length > 0) throw new ApiError(409,"Already registered with this email");


    const hashed = await bcrypt.hash(password, 10);

   
    const inserted = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashed,
        is_verified: true,
      })
      .returning();

    const createdUser = inserted[0];

    if (!createdUser) throw new ApiError(500,"User creation failed");

    const token = jwt.sign(
      { id: createdUser.id, email: createdUser.email, role: createdUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

   
    const returnedUser: User = {
      id: createdUser.id,
      name: createdUser.name!,
      email: createdUser.email,
      role: createdUser.role,
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at,
      token: token,
    };

    return returnedUser;
  } catch (e: any) {
    throw new ApiError(500,"Sign up failed");
  }


}

}
