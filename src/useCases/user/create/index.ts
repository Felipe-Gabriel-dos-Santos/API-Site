import { IUserRepository } from "../../../infra/repositories/user/IUserRepository";
import User from "../../../domain/user";
import { DocumentType } from "@typegoose/typegoose";

class CreateUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(data: User): Promise<DocumentType<User>> {
    const userAlreadyExists: DocumentType<User> =
      await this._userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    return this._userRepository.create(data);
  }
}
