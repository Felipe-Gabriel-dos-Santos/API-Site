import { Collection } from "../Collection";
import userModel from "../../schemas/user";
import { JWT } from "./JWT";

class Authentication {
  private JWTAuthentication = new JWT();
  private userCollection = new Collection(userModel);
  private isLoggedIn: Boolean = false;
  constructor(
    private readonly email: string,
    private readonly password: string
  ) {}

  login() {
    return new Promise((resolve, reject) => {
      this.userCollection
        .readDocumentByFields({ email: this.email, password: this.password })
        .then((user) => {
          this.isLoggedIn = true;
          user.token = this.JWTAuthentication.generateToken(user.id);
          resolve(user);
        })
        .catch((err) => {
          this.isLoggedIn = false;
          reject(err);
        });
    });
  }

  createAccount(name: string) {
    return this.userCollection
      .createDocument({
        name,
        email: this.email,
        password: this.password,
      })
      .then((user) => {
        this.isLoggedIn = true;
        user.token = this.JWTAuthentication.generateToken(user.id);
        return user;
      })
      .catch((err) => {
        this.isLoggedIn = false;
        return err;
      });
  }

  isLogged() {
    return this.isLoggedIn;
  }
}

export { Authentication };
