import Mock from "mockjs";
import {EachData} from "../components/Carousel/types/Carousel";
const data = [{
    id:"@guid",
    url:"@image",
    path:"@url"
}] as EachData[];


Mock.mock("/api/homeMianCarsel","get",{
    code:0,
    msg:"获取成功",
    "data|5":data
});

Mock.mock("/api/homeAttachCarousel","get",{
    code:0,
    msg:"获取成功",
    "data|5":data
});