import { JWT } from "./JWT";
import { IUserRepository } from "../../../infra/repositories/user/IUserRepository";
import User from "../../../domain/user";

class Authentication {
  constructor(
    private readonly _JWTAuthentication: JWT,
    private readonly _userRepository: IUserRepository,
    private _isLoggedIn: Boolean = false
  ) {}

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._userRepository
        .findByEmailAndPassword(email, password)
        .then((user) => {
          this._isLoggedIn = true;

          this._JWTAuthentication
            .generateToken(user._id)
            .then((token) => (user.token = token))
            .catch((err) => err);

          resolve(user);
        })
        .catch(() => {
          this._isLoggedIn = false;
          reject("Error: User not found or password is incorrect");
        });
    });
  }

  createAccount(name: string, email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._userRepository
        .findByEmail(email)
        .then(() => reject(new Error("User already exists")))
        .catch(() => {
          const user = new User(
            name,
            email,
            password,
            "https://firebasestorage.googleapis.com/v0/b/site-sorri-teste.appspot.com/o/DefaultProfileImage%2Fdefault-profile-image.png?alt=media&token=1742657d-48e1-4a0b-81aa-ea4a8855e910"
          );
          this._userRepository
            .create(user)
            .then((user) => {
              this._isLoggedIn = true;

              this._JWTAuthentication
                .generateToken(user._id)
                .then((token) => (user.token = token))
                .catch((err) => reject(err));

              resolve(user);
            })
            .catch((err) => {
              this._isLoggedIn = false;
              reject(err);
            });
        });
    });
  }

  isLogged() {
    return this._isLoggedIn;
  }
}

export { Authentication };
