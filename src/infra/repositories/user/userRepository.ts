import { ReturnModelType, DocumentType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import User from "../../../domain/user";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  constructor(
    private readonly _model: ReturnModelType<typeof User, BeAnObject>
  ) {}

  create(data: User): Promise<DocumentType<User>> {
    return new Promise((resolve, reject) => {
      this._model.create(data, (err: any, user: any) => {
        if (err) reject(err.message);
        else resolve(user);
      });
    });
  }

  findById(id: string): Promise<DocumentType<User>> {
    return new Promise((resolve, reject) => {
      this._model.findById(id, (err: any, user: any) => {
        if (err) reject(err.message);
        else resolve(user);
      });
    });
  }

  findByEmail(email: string): Promise<DocumentType<User>> {
    return new Promise((resolve, reject) => {
      this._model.find({ email }, (err: any, user: any) => {
        if (err) reject(err.message);
        else resolve(user);
      });
    });
  }

  findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<DocumentType<User>> {
    return new Promise((resolve, reject) => {
      this._model.find({ email, password }, (err: any, user: any) => {
        if (err) reject(err.message);
        else resolve(user);
      });
    });
  }

  update(id: string, dataToUpdate: Partial<User>): Promise<DocumentType<User>> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(
        id,
        dataToUpdate,
        { new: true },
        (err: any, user: any) => {
          if (err) reject(err.message);
          else resolve(user);
        }
      );
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndDelete(id, (err: any, user: any) => {
        if (err) reject(err.message);
        else resolve();
      });
    });
  }
}

export default UserRepository;
