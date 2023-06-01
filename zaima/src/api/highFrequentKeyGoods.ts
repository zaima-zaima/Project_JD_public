import request from "./request";


export async function getHighFrequentGoods() {
   return await  request.get("/api/getHighFrequentGoods");
}