import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import app from "../Firebase/firebaseConfig";

const storage = getStorage(app);

interface imageUploadResult {
  success: boolean;
  message: string;
}

async function fileToUint8Array(file: File): Promise<Uint8Array> {
  return await file.arrayBuffer().then((buffer) => new Uint8Array(buffer));
}

async function uploadImageToFirebase(
  ref: StorageReference,
  file: File
): Promise<imageUploadResult> {
  const fileUint8Array = await fileToUint8Array(file);
  return await uploadBytes(ref, fileUint8Array, { contentType: file.type })
    .then(() => {
      return {
        success: true,
        message: "Uploaded successfully",
      };
    })
    .catch((err) => {
      return {
        success: false,
        message: `ERROR: ${err.message}`,
      };
    });
}

export async function uploadSingleImage(_: any, { file }: { file: File }) {
  const imagesRef = ref(storage, `images/${file.name}`);

  const result = await uploadImageToFirebase(imagesRef, file);

  if (result.success) {
    const url = await getDownloadURL(imagesRef)
      .then((url) => url)
      .catch((err) => err.message);

    return url;
  } else {
    return result.message;
  }
}

export async function uploadMultipleProductsImages(
  _: any,
  { files, productId }: { files: File[]; productId: string }
) {
  const URLs = files.map(async (file) => {
    const imageRef = ref(storage, `products/${productId}/${file.name}`);

    const result = await uploadImageToFirebase(imageRef, file);

    if (result.success) {
      return await getDownloadURL(imageRef).then((url) => url);
    }
  });

  return await Promise.all(URLs).then((urls) => urls);
}
