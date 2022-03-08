import { createWriteStream } from "fs";
import { finished } from "stream/promises";

export async function singleUpload(_, { file }) {
  const { createReadStream, filename, mimetype, encoding } = await file;

  Object.keys(file).forEach((key) => {
    console.log(file[key]);
  });

  const stream = createReadStream();

  const out = createWriteStream(`./src/uploads/${filename}`);
  stream.pipe(out);
  await finished(out);

  return { filename, mimetype, encoding };
}
