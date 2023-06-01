import Mock from "mockjs";

Mock.mock("/api/login","post",{
    code:0,
    msg:"登录成功",
    data:{
        username:"@cname",
        avatar:null,
        level:1
    }
})


Mock.mock("/api/whoami","post",{
    code:0,
    msg:"获取用户信息成功",
    data:{
        id:"@guid",
        username:"@cname",
        avatar:null,
        level:1,
        vip:false
    }
})