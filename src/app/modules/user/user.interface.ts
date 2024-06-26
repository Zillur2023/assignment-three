
export type TUserRole = "admin" | "user";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
}
