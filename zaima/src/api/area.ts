import request from "./request";

export async function getArea(parentId?: string) {
  if (!parentId) {
    return await request.get(`/api/area`);
  }
  return await request.get(`/api/area?parentId=${parentId}`);
}
