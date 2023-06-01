import Mock from "mockjs";

Mock.mock("/api/getHighFrequentGoods","get",{
    code:0,
    msg:"获取成功",
    "data|10-20":[
        {
            id:"@uuid",
            name:"@cword(4,6)",
            "type|1":["category","goodsType"]
            // "viewTotal|1-100000":1
        }
    ]
})