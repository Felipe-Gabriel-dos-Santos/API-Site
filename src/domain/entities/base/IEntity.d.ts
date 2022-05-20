interface IEntity<T> {
  id: string;
  data: T;
  createdAt: Date;
  updatedAt: Date;
}

export { IEntity };
