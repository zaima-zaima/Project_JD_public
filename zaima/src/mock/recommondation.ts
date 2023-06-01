import Mock from "mockjs";

const hotBrand =  Mock.mock({
    "data|5":[{
        isHot:true,
        id:"@guid",
        "data|8":["@cword(4,6)"]
    }]
}) 


const childBrand = Mock.mock({
    "data|10":[{
        isHot:false,
        id:"@guid",
        thumb:"@image",
        title:"@cword(10,40)",
        price:"@float(0,10000,0,1000)",
        "isSelf|1":[true,false]
    }]
})

const data = [...hotBrand.data,...childBrand.data];

data.sort(()=> 0.5 - Math.random());

Mock.mock("/api/getRecommondation","get",{
    code:0,
    msg:"获取成功",
    data:{
        total:30,
        data
    }
})
