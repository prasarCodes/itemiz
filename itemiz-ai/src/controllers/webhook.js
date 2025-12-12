import { processIncomingMessage } from "./message.js";
import { WhatsAppService } from "../services/whatsapp.js";

export const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const handleWebhook = async (req, res) => {
  let statusCode = 200;
  try {
    const messageObj = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!messageObj) return res.sendStatus(statusCode);

    let message = "";
    const from = messageObj.from;

    console.log(messageObj);
    message = await processIncomingMessage(from, messageObj);
    console.log(message);
    await WhatsAppService.sendWhatsAppMessage(from, message);
  } catch (err) {
    console.error("Webhook error:", err);
    statusCode = 500;
  }
  return res.sendStatus(statusCode);
};
