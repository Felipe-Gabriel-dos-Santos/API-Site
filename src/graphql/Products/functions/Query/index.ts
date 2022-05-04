import productModel from "../../../../MongoDB/schemas/product";
import { Products } from "../../../../MongoDB/class/Products";

const productsCollection = new Products(productModel);

export function getProduct(_: any, { id }: { id: string }) {
  return productsCollection.readDocumentById(id);
}

export function getProducts() {
  return productsCollection.readAllDocuments();
}
