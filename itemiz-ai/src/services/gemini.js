import { geminiClient } from "../config/gemini.js";
import { processWhatsAppImage } from "../services/image.js";
import {
  BUILD_GEMINI_TEXT_PROMPT,
  BUILD_GEMINI_IMAGE_PROMPT,
} from "../constants/prompt.js";

export async function parseUserMessage(message) {
  try {
    let result;
    switch (message.type) {
      case "text":
        result = await parseUserText(message.text?.body || "");
        break;
      case "image":
        result = await parseUserImage(message.image);
        break;
      default:
        break;
    }

    if (!result) return { intent: "help", items: [], group_id: null };

    const raw = result.text;
    console.log(raw);
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("JSON parse error:", raw);
      return { intent: "help", items: [], group_id: null };
    }
  } catch (err) {
    console.error("Gemini error:", err);
    return { intent: "help", items: [], group_id: null };
  }
}

async function parseUserText(message) {
  return await askGemini({
    model: process.env.GEMINI_MODEL,
    contents: BUILD_GEMINI_TEXT_PROMPT(message),
    config: {
      responseMimeType: "application/json",
    },
  });
}

async function parseUserImage(image) {
  const base64Image = await processWhatsAppImage(image);
  if (!base64Image) return { intent: "help", items: [], group_id: null };
  const mimeType = image.mime_type || "image/jpeg";

  return await askGemini({
    model: process.env.GEMINI_MODEL,
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      { text: BUILD_GEMINI_IMAGE_PROMPT() },
    ],
    config: { responseMimeType: "application/json" },
  });
}

async function askGemini(contentObject) {
  try {
    const response = await geminiClient.models.generateContent({
      ...contentObject,
    });
    return response;
  } catch (err) {
    console.error("Gemini error:", err);
  }
}
