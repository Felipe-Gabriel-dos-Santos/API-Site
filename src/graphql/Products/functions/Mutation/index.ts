import firestore from "../../../../Firebase/firestore";

const collectionName = "products";

export function createProduct(
  _: any,
  { productCreateFields }: { productCreateFields: Object }
) {
  const created_at = new Date().toDateString();
  const number_of_sales = 0;
  const number_of_likes = 0;

  const productInfo = {
    ...productCreateFields,
    created_at,
    number_of_sales,
    number_of_likes,
  };

  return firestore.create(collectionName, productInfo);
}

export function updateProduct(
  _: any,
  { id, productUpdatableFields }: { id: string; productUpdatableFields: any }
) {
  return firestore.update(collectionName, id, productUpdatableFields);
}

export function deleteProduct(_: any, { id }: { id: string }) {
  return firestore.delete(collectionName, id);
}
