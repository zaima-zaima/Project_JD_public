import { Deliver } from "./Deliver";
import { Goods } from "./Goods";
import { User } from "./User";

export interface Order {
  id?: string;
  user: string;
  u: User;
  goodsId: string;
  goods: Goods;
  deliverName: string;
  deliverPhone: string;
  deliverAddress: Deliver;
  payment: Payment;
  orderList: Goods[];
  status: OrderStatus;
  deliverNo?: string;
}

export enum Payment {
  baitiao = "baitiao",
  online = "online",
}

export enum OrderStatus {
  pending = "pending",
  cancel = "cancel",
  paid = "paid",
  deliver = "deliver",
  done = "done",
  complated = "complated",
}
