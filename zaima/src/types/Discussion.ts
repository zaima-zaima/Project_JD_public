import { User } from "./user";

export interface Discussion {
  id?: string;
  userid: string;
  msg: string;
  goodsid: string;
  user: User;
  createdAt: string;
}
