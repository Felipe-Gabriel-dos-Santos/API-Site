import { Collection } from "../../../../MongoDB/class/Collection";
import productModel from "../../../../MongoDB/schemas/product";

const productsCollection = new Collection(productModel);

export function createProduct(
  _: any,
  { productCreateFields }: { productCreateFields: Object }
) {
  return productsCollection.createDocument(productCreateFields);
}

export function updateProduct(
  _: any,
  { id, productUpdatableFields }: { id: string; productUpdatableFields: any }
) {
  return productsCollection.updateDocument(id, productUpdatableFields);
}

export function deleteProduct(_: any, { id }: { id: string }) {
  return productsCollection.deleteDocument(id);
}
