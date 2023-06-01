import request from "./request";

export async function sendSms(phone:string) {
   return await request.post("/api/sms",{
        phone
    })
}

export async function checkCode(phone:string,code:string) {
    return await request.post("/api/sms/verify",{
        phone,
        captcha:code
    })
}