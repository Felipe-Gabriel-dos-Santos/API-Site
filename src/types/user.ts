export interface IUserCreateInput {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
}

export interface IUser extends IUserCreateInput {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
