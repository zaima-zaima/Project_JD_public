import { Admin } from "../types/Admin";
import request from "./request";

export async function fetchAllAdminByFilter(
  filter: Object,
  page?: number,
  limit?: number
) {
  return await request.get(
    `/api/admin?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}`
  );
}

export async function fetchAdminById(id: string) {
  return await request.get(`/api/admin/${id}`);
}

export async function adminRegistor(data: Admin) {
  return await request.post(`/api/admin`, data);
}

export async function fetchAdminByOrder() {
  return await request.get(`/api/admin/o/orderby`);
}

export function fetchAdminByKeyword(keywords: string) {
  return request.get(`/api/admin/s/wd?keywords=${keywords}`);
}

export async function updateAdmin(id: string, data: Admin) {
  return await request.put(`/api/admin/${id}`, data);
}
