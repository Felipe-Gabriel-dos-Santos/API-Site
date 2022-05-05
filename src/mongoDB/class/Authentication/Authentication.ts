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
          const loggedUser = user[0];

          this.JWTAuthentication.generateToken(loggedUser.id)
            .then((token) => (loggedUser.token = token))
            .catch((err) => err);

          resolve(loggedUser);
        })
        .catch((err) => {
          this.isLoggedIn = false;
          reject(err);
        });
    });
  }

  createAccount(name: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
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
  }

  isLogged() {
    return this.isLoggedIn;
  }
}

export { Authentication };
