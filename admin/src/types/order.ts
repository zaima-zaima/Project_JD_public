import { Deliver } from "./Deliver";
import { Goods } from "./Goods";
import { User } from "./User";

export interface Order {
  id?: string;
  user: string;
  goodsId: string;
  goods: Goods;
  u: User;
  deliverName: string;
  deliverPhone: string;
  deliverAddress: Deliver;
  payment: Payment;
  orderList: Goods[];
  status: OrderStatus;
}

export enum Payment {
  baitiao = "baitiao",
  online = "online",
}

export enum OrderStatus {
  pending = "pending",
  paid = "paid",
  deliver = "deliver",
  done = "done",
}
