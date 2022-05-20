import { IRepository } from "./IRepository";

class Repository<T> implements IRepository<T> {
  create(data: T): Promise<T> {
    return Promise.resolve(data);
  }

  findById(id: string): Promise<T> {
    const data = {};
    return Promise.resolve(data as T);
  }

  findByName(name: string): Promise<T> {
    const data = {};
    return Promise.resolve(data as T);
  }

  findByEmail(email: string): Promise<T> {
    const data = {};
    return Promise.resolve(data as T);
  }

  findAll(): Promise<T[]> {
    const data = [{}];
    return Promise.resolve(data as T[]);
  }

  update(id: string, data: Partial<Omit<T, "id">>): Promise<T> {
    return Promise.resolve(data as T);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}

export { Repository };
