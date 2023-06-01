import { Order } from "./order";
import { User } from "./User";

export interface Comment {
  id?: string;
  goodsid: string;
  uid: string;
  user?: User;
  oid: string;
  order?: Order;
  star: number;
  thumbs: string | string[];
  content: string;
  comment: number;
}
