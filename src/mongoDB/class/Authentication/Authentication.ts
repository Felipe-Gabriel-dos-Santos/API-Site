// import { Users } from "../Users";
// import userModel from "../../../mongoDB/schemas/user";
// import { JWT } from "./JWT";

// class Authentication {

//   constructor(
//     private readonly email: string,
//     private readonly password: string,
//     private JWTAuthentication = new JWT(),
//     private userCollection = new Users(userModel),
//     private isLoggedIn: Boolean = false
//   ) {}

//   login() {
//     return new Promise((resolve, reject) => {
//       this.userCollection
//         .({ email: this.email, password: this.password })
//         .then((user) => {
//           this.isLoggedIn = true;
//           user.token = this.JWTAuthentication.generateToken(user.id);
//           resolve(user);
//         })
//         .catch((err) => {
//           this.isLoggedIn = false;
//           reject(err);
//         });
//     });
//   }

//   createAccount(name: string) {
//     return this.userCollection
//       .createDocument({
//         name,
//         email: this.email,
//         password: this.password,
//       })
//       .then((user) => {
//         this.isLoggedIn = true;
//         user.token = this.JWTAuthentication.generateToken(user.id);
//         return user;
//       })
//       .catch((err) => {
//         this.isLoggedIn = false;
//         return err;
//       });
//   }

//   isLogged() {
//     return this.isLoggedIn;
//   }
// }

// export { Authentication };
