import { Model } from "mongoose";
import { deleteResponse } from "../../types/deleteResponse";

export class Collection {
  constructor(private model: Model<any>) {}

  protected createDocument<T>(data: Object): Promise<T> {
    return new Promise((resolve, reject) => {
      return this.model.create(data, (err: any, result: any) => {
        if (err) reject(err);

        resolve(result as T);
      });
    });
  }

  protected createManyDocuments<T>(data: Object[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model.insertMany(data, undefined, (err: any, result: any) => {
        if (err) reject(err);
        resolve(result as T[]);
      });
    });
  }

  protected readDocumentById<T>(documentId: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findById(documentId, null, null, (err: any, result: any) => {
        if (err) {
          if (err.message.includes("Cast to ObjectId failed for value")) {
            reject(new Error("invalid document id"));
          } else reject(err);
        }
        if (!result) reject(new Error("document not found"));

        resolve(result as T);
      });
    });
  }

  protected readDocumentByFields<T>(fields: Object): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findOne(fields, null, null, (err: any, result: any) => {
        if (err) reject(err);
        if (!result) reject(new Error("document not found"));

        resolve(result as T);
      });
    });
  }

  protected readAllDocuments<T>(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model.find({}, null, null, (err: any, result: any) => {
        if (err) reject(err);
        if (!result) reject(new Error("no documents found"));

        resolve(result as T[]);
      });
    });
  }

  protected updateDocument<T>(documentId: string, data: Object): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(
        documentId,
        data,
        { new: true, timestamps: true },
        (err: any, result: any) => {
          if (err) reject(err);
          resolve(result as T);
        }
      );
    });
  }

  protected deleteDocument(documentId: string): Promise<deleteResponse> {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndDelete(documentId, null, (err: any) => {
        if (err) {
          resolve({
            message: `ERROR: ${err.message}`,
            code: 404,
            success: false,
          });
        }

        resolve({
          message: "document deleted successfully",
          code: 200,
          success: true,
        });
      });
    });
  }

  protected deleteManyDocuments(
    documentsIds: string[]
  ): Promise<deleteResponse> {
    return new Promise((resolve, reject) => {
      this.model.deleteMany(
        { _id: { $in: documentsIds } },
        undefined,
        (err: any) => {
          if (err) {
            resolve({
              message: `ERROR: ${err.message}`,
              code: 404,
              success: false,
            });
          }
          resolve({
            message: "documents deleted successfully",
            code: 200,
            success: true,
          });
        }
      );
    });
  }
}
