export interface IUserInput {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface IUser extends IUserInput {
  id: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}
