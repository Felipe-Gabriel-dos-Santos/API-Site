import storage from "../../../../Firebase/storage";

interface Input {
  files: File[];
  productId: string;
}

export function uploadSingleImage(_: any, { file }: { file: File }) {
  return storage.uploadFile("images", file);
}

export async function uploadArrayImages(_: any, { files, productId }: Input) {
  return await storage.uploadMultipleFiles(`products/${productId}`, files);
}
