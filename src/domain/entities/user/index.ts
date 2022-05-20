import { Entity } from "../base/entity";
import { IUser } from "./IUser";

class User extends Entity<IUser> {
  constructor(data: IUser, id?: string) {
    super(data, id);
  }
}

export { User, IUser };
