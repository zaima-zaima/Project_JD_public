import Express from "express";
import { sendChatMsg } from "../service/chatGPT";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  if (!req.query.ques) {
    res.send(formatResponse(400, "参数错误", null));
    return;
  }

  try {
    console.log("sending");
    const msg = await sendChatMsg("你好");
    // console.log("sending");

    console.log(msg);

    res.send(formatResponse(200, `${msg}`, null));
  } catch (err) {
    res.send(formatResponse(500, "网络错误", err));
  }
});

export default router;
