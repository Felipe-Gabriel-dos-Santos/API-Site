import Product from "../../../domain/product";
import { IProductRepository } from "../../../infra/repositories/product/IProductRepository";

class UpdateProductUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(id: string, dataToUpdate: Partial<Product>): Promise<Product> {
    return this._productRepository.update(id, dataToUpdate);
  }
}

export { UpdateProductUseCase };
