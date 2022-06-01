import Product from "../../../domain/product";
import { IProductRepository } from "../../../infra/repositories/product/IProductRepository";
import { DocumentType } from "@typegoose/typegoose";

class CreateProductUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(product: Product): Promise<DocumentType<Product>> {
    return this._productRepository.create(product);
  }
}

export { CreateProductUseCase };
