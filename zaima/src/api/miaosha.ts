import request from "./request";
import {Miaosha} from "../types/miaosha";

export async function getMiaoSha():Promise<Miaosha> {
   return await request.get("/api/miaosha");
}