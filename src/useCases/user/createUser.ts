import UserRepository from "../../repositories/userRepository";

import { User } from "../../domain/entities/user";
import { userOperationError } from "@/errors/userOperationError";

class createUser {
  constructor(private userRepository: UserRepository) {}

  execute(data: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const userAlreadyExists = await this.userRepository.findById(data.id);

      if (userAlreadyExists) {
        const err = new userOperationError("User already exists", "create");
        reject(err);
      }

      const user = this.userRepository.create(data);

      resolve(user);
    });
  }
}
