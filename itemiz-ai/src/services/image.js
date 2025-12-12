import axios from "axios";
import { Formatter } from "../utils/formatter.js";

export async function processWhatsAppImage(image) {
  try {
    const imageUrl = image.url;
    if (!imageUrl) return Formatter.error();

    const mediaBinary = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      },
    });

    return Buffer.from(mediaBinary.data).toString("base64");
  } catch (err) {
    console.error("processIncomingImage error:", err.response?.data || err);
    return Formatter.error();
  }
}
