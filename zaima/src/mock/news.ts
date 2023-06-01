import Mock from "mockjs";
import {NewsItem} from "../types/news";
const array = [
    {
        category:"@cword(2)",
        id:"@guid",
        newsTitle:"@cparagraph(1,2)"
    }
] as NewsItem[];


Mock.mock("/api/getNews","get",{
    code:0,
    msg:"获取成功",
    "data|4":array
})