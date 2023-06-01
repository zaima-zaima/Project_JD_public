import sms from "../../configure/authKey/sms";
import Error from "../utils/Error";
import { fromTimeStampToStand } from "../utils/formatDate";
import getClientIp from "../utils/getIp";
import { randomNumberGenerator } from "../utils/random";
import ZhenzismsClient from "../utils/zhenzisms";

import { searchUser } from "../mysql/api/user";

const regPhone = /^1[3456789]\d{9}$/;
let lastSend = {};

let sendSMS = {};
const client = new ZhenzismsClient(sms.sendURL, sms.appId, sms.appSecureKey);

export async function sendSmS(phone: string, req: any) {
  if (!regPhone.test(phone)) {
    throw new Error.Params("手机号有误");
  }

  const findUser = JSON.parse(JSON.stringify(await searchUser(phone)));

  console.log(findUser);

  if (findUser.rows.length > 0) {
    throw new Error.Forbiden(
      "该手机号已存在，请换个手机号重试或直接使用此手机号进行登录"
    );
  }

  const nowResquestTime = new Date().getTime();

  if (!sendSMS[getClientIp(req)]) {
    sendSMS[getClientIp(req)] = [];
  }

  const delay =
    sendSMS[getClientIp(req)][sendSMS[getClientIp(req)].length - 1] +
    24 * 60 * 60 * 1000;

  if (nowResquestTime > delay) {
    sendSMS[getClientIp(req)] = [];
  }

  if (sendSMS[getClientIp(req)].length > 10) {
    throw new Error.Forbiden(
      `当前请求次数过多,请${fromTimeStampToStand(delay, true)} 后重试`
    );
  }

  if (!lastSend[getClientIp(req)]) {
    lastSend[getClientIp(req)] = 0;
  }

  if (
    nowResquestTime - lastSend[getClientIp(req)] < 60 * 1000 &&
    lastSend[getClientIp(req)] != 0
  ) {
    throw new Error.Forbiden(`请1分钟后重试`);
  }

  let code = "";

  for (let index = 0; index < 5; index++) {
    code += randomNumberGenerator(0, 9);
  }

  const smsRes = (await client.send({
    templateId: sms.smsTmpId,
    number: req.body.phone,
    templateParams: [`${code}`, "5"],
  })) as any;

  console.log(code);

  if (smsRes.code === 0) {
    if (!req.session.captcha) {
      req.session.captcha = {};
    }
    req.session.captcha[req.body.phone] = +code;
    sendSMS[getClientIp(req)].push(nowResquestTime);
    lastSend[getClientIp(req)] = nowResquestTime;
    return true;
  } else {
    throw new Error.UnkownError();
  }
}
