import { Deliver } from "../types/Deliver";
import request from "./request";

export async function fetchDeliver(uid: string) {
  return await request.get(`/api/deliver?uid=${uid}`);
}

export async function updateDeliver(id: string, data: Deliver) {
  return await request.put(`/api/deliver/${id}`, data);
}

export async function setDeliver(data: Deliver) {
  return await request.post(`/api/deliver`, data);
}

export async function deleteDeliver(id: string) {
  return await request.delete(`/api/deliver/${id}`);
}
