interface IUserRepository {
  create(data: User): Promise<User>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  update(id: string, data: Partial<Omit<User, "createdAt">>): Promise<User>;

  delete(id: string): Promise<void>;
}

export { IUserRepository };
