import { IUserRepository } from "../../../infra/repositories/user/IUserRepository";
import User from "../../../domain/user";
import { DocumentType } from "@typegoose/typegoose";

class FindByIdUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(id: string): Promise<DocumentType<User>> {
    return this._userRepository.findById(id);
  }
}
