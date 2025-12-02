export default interface IAuthRepository {
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
}
