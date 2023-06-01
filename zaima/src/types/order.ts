import { Deliver } from "./Deliver";
import { Goods } from "./Goods";

export interface Order {
  id?: string;
  user: string;
  deliverName: string;
  deliverPhone: string;
  deliverAddress: string;
  goods: Goods;
  payment: Payment;
  orderList?: Goods[];
  status: OrderStatus;
  count: number;
  updatedAt: string;
  createdAt: string;
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
