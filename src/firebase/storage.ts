import app from "./firebaseConfig";
import {
  getStorage,
  FirebaseStorage,
  uploadBytes,
  getDownloadURL,
  ref,
} from "firebase/storage";

class Storage {
  private storage: FirebaseStorage;

  constructor() {
    this.storage = getStorage(app);
  }

  async uploadFile(folderName: string, file: File): Promise<string> {
    const fileUint8Array = await file
      .arrayBuffer()
      .then((buffer) => new Uint8Array(buffer));

    const storageRef = ref(this.storage, `${folderName}/${file.name}`);

    return await uploadBytes(storageRef, fileUint8Array, {
      contentType: file.type,
    })
      .then(() => {
        return getDownloadURL(storageRef)
          .then((url) => url)
          .catch((err) => err.message);
      })
      .catch((err) => err.code);
  }

  async uploadMultipleFiles(folderName: string, files: File[]) {
    const URLs = files.map(async (file) => {
      const fileUint8Array = await file
        .arrayBuffer()
        .then((buffer) => new Uint8Array(buffer));

      const storageRef = ref(this.storage, `${folderName}/${file.name}`);

      return uploadBytes(storageRef, fileUint8Array, { contentType: file.type })
        .then(() =>
          getDownloadURL(storageRef)
            .then((url) => url)
            .catch((err) => err.code)
        )
        .catch((err) => err.code);
    });

    return await Promise.all(URLs).then((urls) => urls);
  }
}
