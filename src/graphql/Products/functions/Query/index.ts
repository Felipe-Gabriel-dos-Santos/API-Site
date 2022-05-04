import productModel from "../../../../mongoDB/schemas/product";
import { Products } from "../../../../mongoDB/class/Products";

const productsCollection = new Products(productModel);

export function getProduct(_: any, { id }: { id: string }) {
  return productsCollection.readProductById(id);
}

export function getProducts() {
  return productsCollection.readAllProducts();
}
