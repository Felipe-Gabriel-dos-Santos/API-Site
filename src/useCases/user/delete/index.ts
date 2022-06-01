import { IUserRepository } from "../../../infra/repositories/user/IUserRepository";

class DeleteUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    return this._userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
