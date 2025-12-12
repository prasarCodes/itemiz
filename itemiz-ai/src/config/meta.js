import dotenv from "dotenv";
dotenv.config();

export const sendWhatsAppMessageConfig = {
  token: process.env.WHATSAPP_ACCESS_TOKEN,
  url: `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
};
