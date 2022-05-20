import { Product } from "../../domain/entities/product";
import { IProductRepository } from "./IProductRepository";
import { IRepository } from "../base/IRepository";

class Product_Repository implements IProductRepository {
  private readonly _repository: IRepository<Product>;

  constructor(repository: IRepository<Product>) {
    this._repository = repository;
  }

  async create(data: Product): Promise<Product> {
    return await this._repository.create(data);
  }

  async findById(id: string): Promise<Product> {
    return await this._repository.findById(id);
  }

  async findByName(name: string): Promise<Product> {
    return await this._repository.findByName(name);
  }

  async findAll(): Promise<Product[]> {
    return await this._repository.findAll();
  }

  async update(
    id: string,
    data: Partial<Omit<Product, "id">>
  ): Promise<Product> {
    return await this._repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return await this._repository.delete(id);
  }
}
