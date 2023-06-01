import request from "./request";

export async function getRolers() {
  return await request.get("/api/user/roler");
}

export async function createRoler(name: string) {
  return await request.post("/api/user/roler", {
    name,
  });
}

export async function rolerUpdator(id: string, name: string) {
  return await request.put("/api/user/roler", {
    id,
    name,
  });
}

export async function deleteRoler(id: string) {
  return await request.delete(`/api/user/roler/${id}`);
}
