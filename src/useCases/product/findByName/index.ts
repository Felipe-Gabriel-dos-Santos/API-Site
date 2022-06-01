import Product from "../../../domain/product";
import { IProductRepository } from "../../../infra/repositories/product/IProductRepository";
import { DocumentType } from "@typegoose/typegoose";

class FindByNameProductUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(name: string): Promise<DocumentType<Product>> {
    return this._productRepository.findByName(name);
  }
}

export { FindByNameProductUseCase };
