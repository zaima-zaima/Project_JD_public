import { Order } from "../types/order";
import request from "./request";

export async function fetchAllOrder(page: number, limit: number) {
  return await request.get(`/api/order?page=${page}&limit=${limit}`);
}

export async function fetchAllOrderByUser(
  uid: string,
  page: number,
  limit: number
) {
  return await request.get(`/api/order/u/${uid}?page=${page}&limit=${limit}`);
}

export async function fetchOrderById(id: string) {
  return await request.get(`/api/order/o/${id}`);
}

export async function updateOrder(id: string, data: Order) {
  return await request.put(`/api/order/${id}`, data);
}

export async function deleteOrder(id: string) {
  return await request.delete(`/api/order/${id}`);
}

export async function fetchOrderCountByUser() {
  return await request.get(`/api/order/c`);
}
