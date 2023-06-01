import { Configuration, OpenAIApi } from "openai";
import chatGPT from "../../configure/authKey/chatGPT";

export async function sendChatMsg(msg: string) {
  const configuration = new Configuration({
    apiKey: chatGPT.screatKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg,
    temperature: 0.9,
  });
  return completion.data.choices[0].text;
}
