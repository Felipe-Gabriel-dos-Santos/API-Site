import { v4 as generateId } from "uuid";
import { IEntity } from "./IEntity";

abstract class Entity<T> implements IEntity<T> {
  public readonly id: string;
  public readonly data: T;
  public readonly createdAt: Date = new Date();
  public readonly updatedAt: Date = new Date();

  constructor(data: T, id?: string) {
    this.data = data;
    this.id = id ? id : generateId();
  }
}

export { Entity };
