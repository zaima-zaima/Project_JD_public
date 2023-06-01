import { Order, OrderStatus } from "../types/order";
import request from "./request";

type PaymentMethod = "online" | "baitiao";

interface Pay {
  oid: string;
  paymentMethod: PaymentMethod;
  user: string;
}

export async function pay(data: Pay) {
  return await request.post(`/api/pay`, data);
}

export async function payGroup(data: Order) {
  return await request.post(`/api/pay/group`, { order: data });
}
