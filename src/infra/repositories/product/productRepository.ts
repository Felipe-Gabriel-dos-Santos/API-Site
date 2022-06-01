import { ReturnModelType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import Product from "../../../domain/product";
import { IProductRepository } from "./IProductRepository";
import { DocumentType } from "@typegoose/typegoose";

class ProductRepository implements IProductRepository {
  constructor(
    private readonly _model: ReturnModelType<typeof Product, BeAnObject>
  ) {}

  create(data: Product): Promise<DocumentType<Product>> {
    return new Promise((resolve, reject) => {
      this._model.create(data, (err: any, product: any) => {
        if (err) reject(err.message);
        else resolve(product);
      });
    });
  }

  findById(id: string): Promise<DocumentType<Product>> {
    return new Promise((resolve, reject) => {
      this._model.findById(id, (err: any, product: any) => {
        if (err) reject(err.message);
        else resolve(product);
      });
    });
  }

  findByName(productName: string): Promise<DocumentType<Product>> {
    return new Promise((resolve, reject) => {
      this._model.find({ name: productName }, (err: any, product: any) => {
        if (err) reject(err.message);
        else resolve(product);
      });
    });
  }

  findAll(): Promise<DocumentType<Product>[]> {
    return new Promise((resolve, reject) => {
      this._model.find({}, (err: any, products: any) => {
        if (err) reject(err.message);
        else resolve(products);
      });
    });
  }

  update(
    id: string,
    dataToUpdate: Partial<Product>
  ): Promise<DocumentType<Product>> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(
        id,
        dataToUpdate,
        { new: true },
        (err: any, product: any) => {
          if (err) reject(err.message);
          else resolve(product);
        }
      );
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._model.findByIdAndDelete(id, (err: any, product: any) => {
        if (err) reject(err.message);
        else resolve();
      });
    });
  }
}

export default ProductRepository;
