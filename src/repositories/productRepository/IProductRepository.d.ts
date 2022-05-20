interface IProductRepository {
  create(product: Product): Promise<Product>;

  findById(id: string): Promise<Product>;

  findByName(name: string): Promise<Product>;

  findAll(): Promise<Product[]>;

  update(id: string, data: Partial<Omit<Product, "id">>): Promise<Product>;

  delete(id: string): Promise<void>;
}

export { IProductRepository };
