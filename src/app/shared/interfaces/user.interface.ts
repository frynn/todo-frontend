export interface IUser {
  userId: number;
  email: string;
  password?: string;
  firstName?: string;
  secondName?: string;
}

export interface IRegister{
  firstName: string;
  password: string;
  email: string;
}
