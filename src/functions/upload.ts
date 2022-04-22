import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../Firebase/firebaseConfig";

const storage = getStorage(app);

export async function singleUpload(_: any, { file }: { file: File }) {
  const imagesRef = ref(storage, `Products/${file.name}`);

  const newFile = await file
    .arrayBuffer()
    .then((buffer) => new Uint8Array(buffer));

  const result = await uploadBytes(imagesRef, newFile, {
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

  return result;
}
