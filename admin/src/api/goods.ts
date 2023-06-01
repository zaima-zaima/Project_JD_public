import request from "./request";
import { Goods } from "../types/Goods";

export async function goodsCreator(data: Goods) {
  return await request.post("/api/goods/add", data);
}

export async function getGoods(page: number, limit: number) {
  return await request.get(`/api/goods?page=${page}&limit=${limit}`);
}

export async function getGoodsById(id: string) {
  return await request.get(`/api/goods/${id}`);
}

export async function getGoodsByRandom(length: number) {
  return await request.get(`/api/goods/r/${length}`);
}

export async function getGoodsFrequentCount() {
  return await request.get("/api/goods/g/f");
}

export async function getGoodsSoldCount() {
  return await request.get("/api/goods/g/c");
}

export async function updateGoods(id: string, form: Goods) {
  return await request.put(`/api/goods/${id}`, form);
}

export async function removeGoods(id: string) {
  return await request.delete(`/api/goods/${id}`);
}
