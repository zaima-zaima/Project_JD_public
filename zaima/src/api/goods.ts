import request from "./request";

export async function searchGoods(keyword:string,page:number,limit:number) {
  return await request.get(`/api/goods/s/g?keyword=${keyword}&page=${page}&limit=${limit}`);
}

export async function getGoodsById(id:string) {
  return await request.get(`/api/goods/${id}`);
}