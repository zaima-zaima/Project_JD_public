import { Recommondation } from "../types/recommondation";
import request from "./request";

export async function getRecommondation():Promise<Recommondation> {
   return await request.get("/api/getRecommondation");
}