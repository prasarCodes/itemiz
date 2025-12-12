// src/utils/formatter.js

export const Formatter = {
  // GROUP FORMATTERS
  groupCreated(group) {
    return (
      `Group Created\n\n` +
      `Name: ${group.name}\n` +
      `ID: ${group.group_id}\n\n` +
      `Share this ID so others can join!`
    );
  },

  groupJoined(group) {
    return (
      `Joined Group\n\n` +
      `Name: ${group.name}\n` +
      `You can now add or consume items!`
    );
  },

  groupNotFound() {
    return `Group not found.`;
  },

  noGroupJoined() {
    return `You must join a group first. Use: join <groupId>`;
  },

  missingGroupId() {
    return `You must specify a group ID.`;
  },

  // INVENTORY FORMATTERS
  inventoryList(items) {
    const list = items
      .map((i) => `• ${i.name}: ${i.quantity}${i.unit ? " " + i.unit : ""}`)
      .join("\n");

    return `Inventory:\n\n${list}`;
  },

  inventoryEmpty() {
    return `Inventory is empty!`;
  },

  itemsAdded() {
    return `Items added to inventory!`;
  },

  inventoryAdded(phone, items) {
    if (!items || !items.length) {
      return "No items found to add.";
    }

    const formattedList = items
      .map((i) => `• ${i.name} — ${i.quantity ?? "?"} ${i.unit ?? ""}`.trim())
      .join("\n");

    return `*Items Added by +${phone}*\n\n${formattedList}\n\nInventory is now updated!`;
  },

  itemsConsumed() {
    return `Inventory updated!`;
  },

  help() {
    return (
      `Welcome to Itemiz.ai\n\n` +
      `To get started, just send a screenshot of purchase from any delivery app to add items to the inventory.\n\n` +
      `Or, you can tell the bot what to do:\n` +
      `• add items → "bought 2kg tomatoes"\n` +
      `• consume items → "used 3 onions"\n` +
      `• query inventory → "what do we have?"\n` +
      `• create a group → "create group flatmates"\n` +
      `• join a group → "join ABC123"\n\n` +
      `Try something!`
    );
  },

  unknownIntent() {
    return `I didn't understand. Send 'help' for options.`;
  },

  error() {
    return `Something went wrong. Try again.`;
  },
};
