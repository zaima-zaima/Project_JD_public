import request from "./request";

export async function fetchAllDeparment() {
  return await request.get(`/api/department`);
}

export async function departmentCreator(name: string) {
  return await request.post(`/api/department`, {
    name,
  });
}
