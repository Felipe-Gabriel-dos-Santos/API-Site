import "dotenv/config";
import { sign, verify } from "jsonwebtoken";

interface IVerifyToken {
  dataFromToken: { id: string | null };
  isValid: boolean;
  message: string;
}

export class JWT {
  generateToken(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (process.env.SECRET_KEY)
        resolve(sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" }));
      else reject(new Error("Not found secret key"));
    });
  }

  verifyToken(token: string): Promise<IVerifyToken> {
    return new Promise((resolve, reject) => {
      if (process.env.SECRET_KEY) {
        try {
          const { id } = verify(token, process.env.SECRET_KEY) as {
            id: string;
          };
          resolve({
            dataFromToken: { id },
            isValid: true,
            message: "is valid token",
          });
        } catch {
          reject({
            dataFromToken: { id: null },
            isValid: false,
            message: "is not valid token",
          });
        }
      } else
        reject({
          dataFromToken: { id: null },
          isValid: false,
          message: "not found secret key",
        });
    });
  }
}
