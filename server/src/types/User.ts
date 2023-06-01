export interface User {
  id?: string;
  username: string;
  password?: string;
  phone: string;
  role: "user" | "businse";
  avatar?: string;
  credit: number;
  baitiao: null | number;
  status: UserStatus;
}

export enum UserStatus {
  normal = "normal",
  suspend = "suspend",
  determine = "determine",
  restore = "restore",
}
