import { createWriteStream, readFileSync } from "fs";
import { finished } from "stream/promises";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { join } from "path";

const storage = getStorage();
const imagesRef = ref(storage, "ProductsImages");

export async function singleUpload(_, { file }) {
  const { createReadStream, filename, mimetype, encoding } = await file;

  Object.keys(file).forEach((key) => {
    console.log(file[key]);
  });

  const path = `./public/uploads/${filename}`;

  const stream = createReadStream();

  const out = createWriteStream(path);
  stream.pipe(out);
  await finished(out);

  // uploadBytes(imagesRef, path)
  //   .then(() => {
  //     console.log("teste success");
  //   })
  //   .catch((err) => {
  //     console.log("teste error" + err);
  //   });

  const url = "http://localhost:4000/uploads/" + filename;

  return url;
}
