import { IProductRepository } from "../../../infra/repositories/product/IProductRepository";

class DeleteProductUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    return this._productRepository.delete(id);
  }
}

export { DeleteProductUseCase };
