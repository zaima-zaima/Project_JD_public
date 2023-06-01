import { UserRegister } from "../types/user";
import request from "./request";

export async function checkUser(username:string) {
   return await request.post("/api/signup/checkUser",{
        username
    })
}

export async function signup(user:UserRegister) {
   return await request.post("/api/signup",{
        ...user
    });
}