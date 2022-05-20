import { Entity } from "../base/entity";
import { IAuthor } from "./IAuthor";

class Author extends Entity<IAuthor> {
  constructor(data: IAuthor, id?: string) {
    super(data, id);
  }
}

export { Author };
