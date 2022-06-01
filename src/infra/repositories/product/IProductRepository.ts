import Product from "../../../domain/product";
import { DocumentType } from "@typegoose/typegoose";

interface IProductRepository {
  create(data: Product): Promise<DocumentType<Product>>;
  findById(id: string): Promise<DocumentType<Product>>;
  findByName(productName: string): Promise<DocumentType<Product>>;
  update(
    id: string,
    dataToUpdate: Partial<Product>
  ): Promise<DocumentType<Product>>;
  delete(id: string): Promise<void>;
}

export { IProductRepository };
