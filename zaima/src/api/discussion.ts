import { Discussion } from "../types/Discussion";
import request from "./request";

export async function getDiscussion(limit: number, goodId: string) {
  return await request.get(`/api/discussion?limit=${limit}&goods=${goodId}`);
}

export async function insertDiscussion(data: any) {
  return await request.post("/api/discussion", data);
}
