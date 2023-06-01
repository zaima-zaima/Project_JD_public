// 用户注册

import { User } from "../../types/User";
import model from "../model/user";

export async function register(user:User) {
   const resp = await model.findOne({
    where:{
            username:user.username
        }
   })


    if(JSON.parse(JSON.stringify(resp))) {
        return {
            forbid:true,
            reson:"用户已存在"
        }
    }
    
  return await model.create({
    ...user
   })
}