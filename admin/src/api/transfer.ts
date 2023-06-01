import { Transfer } from "../types/Transfer";
import request from "./request";

export async function transferCreator(data: Transfer) {
  return await request.post("/api/transfer", data);
}

export async function getTransfer(
  page: number,
  limit: number,
  filter: object | undefined | string
) {
  if (filter) {
    filter = JSON.stringify(filter);
  }

  return await request.get(
    `/api/transfer?page=${page}&limit=${limit}&filter=${filter && filter}`
  );
}

export async function getTransferById(id: string) {
  return await request.get(`/api/transfer/${id}`);
}

export async function updateTransfer(id: string, form: Transfer) {
  return await request.put(`/api/transfer/${id}`, form);
}
