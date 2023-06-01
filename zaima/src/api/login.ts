import request from "./request";

export async function login(data: any) {
  return await request.post("/api/login", data);
}

export async function loginByGithub() {
  return await request.get("/api/login/github");
}

export async function jumping(code: string) {
  return await request.post("/api/login/callback", { code });
}

export async function whoami() {
  return await request.get("/api/login/whoami");
}

export async function baitiaoCreator(user: string) {
  return await request.post(`/api/user/bt`, { user });
}
