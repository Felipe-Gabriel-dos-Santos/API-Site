import { Products } from "../../../../mongoDB/class/Products";
import productModel from "../../../../mongoDB/schemas/product";
import { IProductInput } from "../../../../types/product";

const productsCollection = new Products(productModel);

export function createProduct(
  _: any,
  { productCreateFields }: { productCreateFields: IProductInput }
) {
  return productsCollection.createProduct(productCreateFields);
}

export function updateProduct(
  _: any,
  {
    id,
    productUpdatableFields,
  }: { id: string; productUpdatableFields: IProductInput }
) {
  return productsCollection.updateProduct(id, productUpdatableFields);
}

export function deleteProduct(_: any, { id }: { id: string }) {
  return productsCollection.deleteProduct(id);
}
