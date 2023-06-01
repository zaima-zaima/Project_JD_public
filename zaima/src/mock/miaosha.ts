import Mock from "mockjs";
import { SliderItem } from "../types/miaosha";

const curDate = new Date();
const endTime = new Date(
  `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()} ${
    curDate.getHours() + 1
  }:00:00`
).getTime();

const data = {
  startTime: endTime,
  endTime: endTime,
  "goods|10-20": [
    {
      id: "@guid",
      path: "/",
      thumb: "@image",
      title: "@cword(10,20)",
      price: "@float(0,1000000,0,100)",
    },
  ] as SliderItem[],
};

Mock.mock("/api/miaosha", "get", {
  code: 0,
  msg: "获取成功",
  data,
});
