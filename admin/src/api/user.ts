import { User } from "../types/User";
import request from "./request";

export async function fetchAllUser(
  page: number,
  limit: number,
  filter?: Object
) {
  if (filter) {
    filter = JSON.stringify(filter);
  } else {
    filter = "";
  }

  return await request(
    `/api/user?page=${page}&limit=${limit}&filter=${filter}`
  );
}

export function searchUser(keyword: string) {
  return request.get(`/api/user/search?keyword=${keyword}`);
}

export async function userUpdator(id: string, user: any) {
  return await request.put(`/api/user/${id}`, user);
}

export async function removeUser(id: string) {
  return await request.delete(`/api/user/${id}`);
}

export async function restoreUser(id: string) {
  return await request.put(`/api/user/restore/${id}`);
}
