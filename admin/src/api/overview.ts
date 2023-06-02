import request from "./request";

export async function fetchOverViewData() {
  return await request.get("/api/overview");
}
