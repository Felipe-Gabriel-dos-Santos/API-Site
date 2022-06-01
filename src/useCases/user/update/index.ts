import User from "../../../domain/user";
import { IUserRepository } from "../../../infra/repositories/user/IUserRepository";

class UpdateUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(id: string, dataToUpdate: Partial<User>): Promise<User> {
    return this._userRepository.update(id, dataToUpdate);
  }
}
