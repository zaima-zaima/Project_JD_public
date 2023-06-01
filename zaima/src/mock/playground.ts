import Mock from "mockjs";
import {Brand,Section} from "../types/playground"


const data = {
    brand:[
        {thumb:"@image",path:"/"},
        {thumb:"@image",path:"/"}
    ] as Brand[],
    "section|8":[
        {title:"@cword(4,6)",description:"@cword(6,8)",childs:[
            {thumb:"@image",path:"/"},
            {thumb:"@image",path:"/"}
        ]}
    ] as Section[]
}


Mock.mock("/api/playground","get",{
    code:0,
    msg:"获取成功",
    data
})