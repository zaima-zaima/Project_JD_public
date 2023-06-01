import request from "./request";
export async function getCategory(id: string = "") {
  return await request.get(`/api/goods/category/g/?parent=${id}`);
}

export async function appendCategory(
  level: number,
  name: string,
  parent?: string
) {
  return await request.post(`/api/goods/category/`, {
    name,
    parent,
    level,
  });
}
