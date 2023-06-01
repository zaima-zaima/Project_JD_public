import { Order } from "../types/order";
import request from "./request";

export async function getOrderById(oid: string) {
  return await request.get(`/api/order/o/${oid}`);
}

export async function submitOrder(data: Order) {
  return await request.post(`/api/order`, data);
}

export async function getOrderByUser(
  uid: string,
  page: number,
  limit: number,
  filter?: object
) {
  let f = undefined;

  if (filter) {
    f = JSON.stringify(filter);
  }

  return await request.get(
    `/api/order/u/${uid}?page=${page}&limit=${limit}&filter=${f ? f : ""}`
  );
}

export async function updateOrder(oid: string, data: Order) {
  return await request.put(`/api/order/${oid}`, data);
}
