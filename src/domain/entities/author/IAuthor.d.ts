import { Product } from "../product";
import { User } from "../user";

interface IAuthor {
  username: string;
  user: User;
  createdProducts: Product[];
}
