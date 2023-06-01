import request from "./request";
import { NewsItem } from "../types/news";


// 获取京东新闻信息

export async function getNews():Promise<NewsItem[]> {
   return await request.get("/api/getNews") as unknown as NewsItem[];
}