import { Collection } from "./Collection";
import { Model } from "mongoose";
import { IProductInput, IProduct } from "../../types/product";
import { deleteResponse } from "../../types/deleteResponse";

class Products extends Collection {
  constructor(model: Model<IProductInput>) {
    super(model);
  }

  createProduct(data: IProductInput): Promise<IProduct> {
    return this.createDocument<IProduct>(data);
  }

  createManyProducts(data: IProductInput[]): Promise<IProduct[]> {
    return this.createManyDocuments<IProduct>(data);
  }

  readProductById(documentId: string): Promise<IProduct> {
    return this.readDocumentById<IProduct>(documentId);
  }

  readProductByFields(fields: Object): Promise<IProduct> {
    return this.readDocumentByFields<IProduct>(fields);
  }

  readAllProducts(): Promise<IProduct[]> {
    return this.readAllDocuments<IProduct>();
  }

  updateProduct(documentId: string, data: IProductInput): Promise<IProduct> {
    return this.updateDocument<IProduct>(documentId, data);
  }

  deleteProduct(documentId: string): Promise<deleteResponse> {
    return this.deleteDocument(documentId);
  }
}

export { Products };
