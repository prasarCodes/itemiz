import { parseUserMessage } from "../services/gemini.js";
import { GroupService } from "../services/group.js";
import { InventoryService } from "../services/inventory.js";
import { Formatter } from "../utils/formatter.js";

export async function processIncomingMessage(phone, payload) {
  try {
    let parsed = await parseUserMessage(payload);

    const intent = parsed?.intent;
    switch (intent) {
      case "create_group":
        return await GroupService.handleCreateGroup(phone, parsed);

      case "join_group":
        return await GroupService.handleJoinGroup(phone, parsed);

      case "add":
        return await InventoryService.handleAdd(phone, parsed);

      case "consume":
        return await InventoryService.handleConsume(phone, parsed);

      case "query":
        return await InventoryService.handleQuery(phone);

      case "help":
        return Formatter.help();

      default:
        return Formatter.unknownIntent();
    }
  } catch (err) {
    console.error("MessageController Error:", err);
    return Formatter.error();
  }
}
