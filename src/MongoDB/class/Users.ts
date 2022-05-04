import { Collection } from "./Collection";
import { Model } from "mongoose";
import { IUserCreateInput } from "../../types/user";
import { deleteResponse } from "../../types/deleteResponse";

class Users extends Collection {
  constructor(model: Model<IUserCreateInput>) {
    super(model);
  }

  createUser(data: IUserCreateInput): Promise<IUserCreateInput> {
    return this.createDocument<IUserCreateInput>(data);
  }

  updateUser(
    documentId: string,
    data: IUserCreateInput
  ): Promise<IUserCreateInput> {
    return this.updateDocument<IUserCreateInput>(documentId, data);
  }

  deleteUser(documentId: string): Promise<deleteResponse> {
    return this.deleteDocument(documentId);
  }
}
