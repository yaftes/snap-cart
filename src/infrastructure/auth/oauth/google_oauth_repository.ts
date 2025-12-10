import { usersTable } from "@/drizzle/schema";
import { IOAuthRepository } from "@/src/application/repositories/auth/oauth_repository_interface";
import { User } from "@/src/entities/models/user";
import { eq } from "drizzle-orm";
import axios from "axios";
import jwt from "jsonwebtoken";
import db from "@/drizzle";

export class GoogleOAuthRepository implements IOAuthRepository {

    private clientId = process.env.GOOGLE_CLIENT_ID!;
    private clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    private redirectUri = process.env.GOOGLE_REDIRECT_URI!;

    // Exchange code for Google tokens

    private async getTokens(code: string) {
        
        const url = "https://oauth2.googleapis.com/token";

        const response = await axios.post(url, {
            code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: "authorization_code",
        });

        return response.data; // contains access_token, id_token, refresh_token
    }



    // Decode the id_token to get user info
    private decodeIdToken(idToken: string) {

        const decoded: any = jwt.decode(idToken); 
        // Google id_token is a JWT with info like email, name, picture, sub (unique Google ID)
        return decoded;

    }

    async signIn(code: string): Promise<User> {

        try {

            const tokens = await this.getTokens(code);

            const googleUser = this.decodeIdToken(tokens.id_token);

            // Look for user in your database by Google ID or email

            const existingUser = await db.select().from(usersTable).where(eq(usersTable.email,googleUser.email));

            if (!existingUser[0]) {
                throw new Error("User not found, please sign up first.");
            }

            const user = existingUser[0];

            // Generate your own JWT for your app
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
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
            throw new Error(e.message || "Google sign-in failed");
        }
    }

    async signUp(code: string): Promise<User> {

        try {

            const tokens = await this.getTokens(code);
            const googleUser = this.decodeIdToken(tokens.id_token);

            // Check if user already exists
            const existingUser = await db.select().from(usersTable).where(
                eq(usersTable.email,googleUser.email)
            );

            if (existingUser[0]) {
                throw new Error("User already exists, please sign in instead.");
            }

            // Insert new user
            const inserted = await db.insert(usersTable).values({
                name: googleUser.name,
                email: googleUser.email,
                is_verified: true, // OAuth users are automatically verified
            }).returning();

            const newUser = inserted[0];

            // Generate your own JWT for your app
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email, role: newUser.role },
                process.env.JWT_SECRET!,
                { expiresIn: "7d" }
            );

            const returnedUser: User = {
                    id: newUser.id.toString(),
                    name: newUser.name!,
                    email: newUser.email,
                    role: newUser.role ?? 'user',
                    created_at: newUser.created_at,
                    updated_at: newUser.updated_at,
                    token,
                };

      return returnedUser;

            
        } catch (e: any) {
            throw new Error(e.message || "Google sign-up failed");
        }
    }
}
