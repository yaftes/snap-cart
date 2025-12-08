import IAuthRepository from "@/src/application/repositories/auth/auth_repository_interface";
import { usersTable } from "../../../drizzle/schema";
import { User } from "@/src/entities/models/user";
import db from "../../../drizzle/index";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import crypto from "crypto-js";
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

      const isMatch = await bcrypt.compare(password, user.password!);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      if(!user.is_verified) {
        throw new Error("Verify your account first please");
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
      
      throw new Error(e.message || "Sign in failed");
    }
  }

  async signOut(): Promise<void> {
    
  }

  async signUp(name: string, email: string, password: string): Promise<User> {

  try {

    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

    // if ther user exists but there account is not verified
    // send the email again to that user and tell to verify it

    if (existingUser.length > 0) throw new Error("Already registered with this email");

    const hashed = await bcrypt.hash(password, 10);

   
    const emailToken = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    const inserted = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashed,
        is_verified: false,
        verification_token: emailToken,
        verification_expires: expires,
      })
      .returning();

    const createdUser = inserted[0];
    if (!createdUser) throw new Error("User creation failed");

    const token = jwt.sign(
      { id: createdUser.id, email: createdUser.email, role: createdUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@yourapp.com",
      to: createdUser.email,
      subject: "Verify your email",
      html: `<p>Click to verify your email:</p>
             <a href="https://yourapp.com/verify?token=${emailToken}">Verify Email</a>`
    });


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
    throw new Error(e.message || "Sign up failed");
  }
}

}
