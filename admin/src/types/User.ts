export interface User {
  id?: string;
  username: string;
  password?: string;
  phone: string;
  role: "user" | "businse";
  avatar?: string;
  credit: number;
  baitiao: null | number;
  status: string;
}

export type Role = "user" | "businse";
