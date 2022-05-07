import { Users } from "../Users";
import userModel from "../../../mongoDB/schemas/user";
import { JWT } from "./JWT";
import { IUser } from "../../../types/user";

class Authentication {
  constructor(
    private readonly email: string,
    private readonly password: string,
    private JWTAuthentication = new JWT(),
    private userCollection = new Users(userModel),
    private isLoggedIn: Boolean = false
  ) {}

  login(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.userCollection
        .readUserByFields({ email: this.email, password: this.password })
        .then((user) => {
          this.isLoggedIn = true;

          this.JWTAuthentication.generateToken(user.id)
            .then((token) => (user.token = token))
            .catch((err) => err);

          resolve(user);
        })
        .catch(() => {
          this.isLoggedIn = false;
          reject("Error: User not found or password is incorrect");
        });
    });
  }

  createAccount(name: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.userCollection
        .readUserByFields({ email: this.email })
        .then(() => reject(new Error("User already exists")))
        .catch(() => {
          this.userCollection
            .createUser({
              name,
              email: this.email,
              password: this.password,
            })
            .then((user) => {
              this.isLoggedIn = true;
              this.JWTAuthentication.generateToken(user.id)
                .then((token) => (user.token = token))
                .catch((err) => reject(err));

              resolve(user);
            })
            .catch((err) => {
              this.isLoggedIn = false;
              reject(err);
            });
        });
    });
  }

  isLogged() {
    return this.isLoggedIn;
  }
}

export { Authentication };
