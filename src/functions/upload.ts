import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../Firebase/firebaseConfig";

const storage = getStorage(app);

export async function singleUpload(_: any, { file }: { file: File }) {
  const imagesRef = ref(storage, `Products/${file.name}`);

  const Uint8ArrayFromFile = await file
    .arrayBuffer()
    .then((buffer) => new Uint8Array(buffer));

  const result = await uploadBytes(imagesRef, Uint8ArrayFromFile, {
    contentType: file.type,
  })
    .then(() => {
      return {
        success: true,
        message: "Uploaded successfully",
      };
    })

    .catch((error) => {
      return {
        success: false,
        message: `ERROR: ${error.message}`,
      };
    });

  if (result.success) {
    const url = await getDownloadURL(imagesRef)
      .then((url) => url)
      .catch((err) => err.message);

    return url;
  } else {
    return result.message;
  }
}
