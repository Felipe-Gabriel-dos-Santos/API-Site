import User from "../../../domain/user";
import { DocumentType } from "@typegoose/typegoose";

interface IUserRepository {
  create(data: User): Promise<DocumentType<User>>;
  findByEmail(email: string): Promise<DocumentType<User>>;
  findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<DocumentType<User>>;
  findById(id: string): Promise<DocumentType<User>>;
  update(id: string, dataToUpdate: Partial<User>): Promise<DocumentType<User>>;
  delete(id: string): Promise<void>;
}

export { IUserRepository };
