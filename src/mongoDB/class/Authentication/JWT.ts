import "dotenv/config";
import { sign, verify } from "jsonwebtoken";

export class JWT {
  generateToken(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (process.env.SECRET_KEY)
        resolve(sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" }));
      else reject(new Error("Not found secret key"));
    });
  }

  verifyToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (process.env.SECRET_KEY) {
        try {
          const { id } = verify(token, process.env.SECRET_KEY) as {
            id: string;
          };
          resolve(id);
        } catch {
          reject(new Error("Invalid token"));
        }
      } else reject(new Error("Not found secret key"));
    });
  }
}
