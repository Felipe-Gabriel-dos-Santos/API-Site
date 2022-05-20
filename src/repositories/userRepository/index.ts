import { User } from "../../domain/entities/user";
import { IRepository } from "../base/IRepository";

import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  private readonly _repository: IRepository<User>;

  constructor(repository: IRepository<User>) {
    this._repository = repository;
  }

  async create(data: User): Promise<User> {
    return await this._repository.create(data);
  }
  async findById(id: string): Promise<User> {
    return await this._repository.findById(id);
  }
  async findByEmail(email: string): Promise<User> {
    return await this._repository.findByEmail(email);
  }
  async update(id: string, data: Partial<Omit<User, "id">>): Promise<User> {
    return await this._repository.update(id, data);
  }
  async delete(id: string): Promise<void> {
    return await this._repository.delete(id);
  }
}

export default UserRepository;
