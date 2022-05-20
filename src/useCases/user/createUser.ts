import UserRepository from "../../repositories/userRepository";

import { User } from "../../domain/entities/user";

class createUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User): Promise<User> {
    return await this.userRepository.create(data);
  }
}
