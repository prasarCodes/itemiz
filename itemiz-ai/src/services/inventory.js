import { InventoryRepository } from "../repository/inventory.js";
import { LogRepository } from "../repository/log.js";
import { MemberRepository } from "../repository/member.js";
import { Formatter } from "../utils/formatter.js";
import { createProducer } from "../kafka/producer/producer.js";
import { TOPICS } from "../kafka/topics.js";

let producer;

export const InventoryService = {
  async init() {
    producer = await createProducer();
  },

  async addItems(groupId, items, phone) {
    const results = [];

    for (const item of items) {
      const existing = await InventoryRepository.findItem(groupId, item.name);

      if (existing) {
        const newQty = existing.quantity + (item.quantity || 0);
        const updated = await InventoryRepository.updateQuantity(
          groupId,
          item.name,
          newQty
        );
        results.push(updated);
      } else {
        const inserted = await InventoryRepository.addItem(
          groupId,
          item.name,
          item.quantity || 0,
          item.unit
        );
        results.push(inserted);
      }

      await LogRepository.addLog(
        groupId,
        item.name,
        "add",
        item.quantity,
        item.unit,
        phone
      );
    }

    return results;
  },

  async consumeItems(groupId, items, phone) {
    const results = [];

    for (const item of items) {
      const existing = await InventoryRepository.findItem(groupId, item.name);
      if (!existing) continue;

      const newQty = existing.quantity - (item.quantity || 0);
      if (newQty <= 0) {
        await InventoryRepository.updateQuantity(groupId, item.name, 0);
      } else {
        await InventoryRepository.updateQuantity(groupId, item.name, newQty);
      }

      results.push({ name: item.name, newQty });

      await LogRepository.addLog(
        groupId,
        item.name,
        "consume",
        item.quantity,
        item.unit,
        phone
      );
    }

    return results;
  },

  async getInventory(groupId) {
    return InventoryRepository.getAll(groupId);
  },

  async handleAdd(phone, parsed) {
    const groupId = await MemberRepository.userGroup(phone);
    if (!groupId) return Formatter.noGroupJoined();

    await InventoryService.addItems(groupId, parsed.items, phone).then(
      async () => {
        await producer.send({
          topic: TOPICS.INVENTORY_EVENTS,
          messages: [
            { value: JSON.stringify({ groupId, items: parsed.items, phone }) },
          ],
        });
      }
    );

    return Formatter.itemsAdded();
  },

  async handleConsume(phone, parsed) {
    const groupId = await MemberRepository.userGroup(phone);
    if (!groupId) return Formatter.noGroupJoined();

    await InventoryService.consumeItems(groupId, parsed.items, phone);

    return Formatter.itemsConsumed();
  },

  async handleQuery(phone) {
    const groupId = await MemberRepository.userGroup(phone);
    if (!groupId) return Formatter.noGroupJoined();

    const items = await InventoryService.getInventory(groupId);
    if (!items.length) return Formatter.inventoryEmpty();

    return Formatter.inventoryList(items);
  },
};
