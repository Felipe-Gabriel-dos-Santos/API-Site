import Product from "../../../domain/product";
import { IProductRepository } from "../../../infra/repositories/product/IProductRepository";
import { DocumentType } from "@typegoose/typegoose";

class FindByIdProductUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(id: string): Promise<DocumentType<Product>> {
    return this._productRepository.findById(id);
  }
}

export { FindByIdProductUseCase };
