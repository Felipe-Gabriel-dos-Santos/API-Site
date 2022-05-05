import { Collection } from "./Collection";
import { Model } from "mongoose";
import { IUserInput, IUser } from "../../types/user";
import { deleteResponse } from "../../types/deleteResponse";

class Users extends Collection {
  constructor(model: Model<IUserInput>) {
    super(model);
  }

  createUser(data: IUserInput): Promise<IUser> {
    return this.createDocument<IUser>(data);
  }

  readUserById(documentId: string): Promise<IUser> {
    return this.readDocumentById<IUser>(documentId);
  }

  readUserByFields(fields: Object): Promise<IUser[]> {
    return this.readDocumentByFields<IUser>(fields);
  }

  readAllUsers(): Promise<IUser[]> {
    return this.readAllDocuments<IUser>();
  }

  updateUser(documentId: string, data: IUserInput): Promise<IUser> {
    return this.updateDocument<IUser>(documentId, data);
  }

  deleteUser(documentId: string): Promise<deleteResponse> {
    return this.deleteDocument(documentId);
  }
}

export { Users };
