import IAuthRepository from "../../repositories/auth/auth_repository_interface";

export const signOutUseCase = (repo: IAuthRepository) => {

  return async () => repo.signOut();

};
