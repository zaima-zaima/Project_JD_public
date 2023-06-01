import { User } from "./User";

export interface Discussion {
  id?: string;
  userid: string;
  msg: string;
  user?: User;
  goodsid: string;
}
