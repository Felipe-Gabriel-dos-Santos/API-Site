interface IRepository<T> {
  create(data: T): Promise<T>;

  findById(id: string): Promise<T>;

  findByName(name: string): Promise<T>;

  findByEmail(email: string): Promise<T>;

  findAll(): Promise<T[]>;

  update(id: string, data: Partial<Omit<T, "id">>): Promise<T>;

  delete(id: string): Promise<void>;
}

export { IRepository };
