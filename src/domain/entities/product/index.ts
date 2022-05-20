import { Entity } from "../base/entity";
import { IProduct } from "./IProduct";

class Product extends Entity<IProduct> {
  constructor(data: IProduct, id?: string) {
    super(data, id);
  }
}

export { Product };
