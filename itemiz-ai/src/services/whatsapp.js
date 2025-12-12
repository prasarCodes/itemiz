import axios from "axios";
import { sendWhatsAppMessageConfig } from "../config/meta.js";

export const WhatsAppService = {
  async sendWhatsAppMessage(from, reply) {
    try {
      await axios.post(
        sendWhatsAppMessageConfig.url,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: reply },
        },
        {
          headers: {
            Authorization: `Bearer ${sendWhatsAppMessageConfig.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("WhatsApp send error:", err.response?.data || err);
    }
  },
};
