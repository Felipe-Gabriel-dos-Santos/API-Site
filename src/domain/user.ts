import { prop } from "@typegoose/typegoose";

class User {
  @prop()
  public readonly name: string;
  @prop()
  public readonly email: string;

  @prop()
  public readonly password: string;

  @prop()
  public readonly avatarUrl: string;

  @prop()
  public token?: string;

  constructor(
    name: string,
    email: string,
    password: string,
    avatarUrl: string,
    token?: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.token = token;
  }
}

export default User;
