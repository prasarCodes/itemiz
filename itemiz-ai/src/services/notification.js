import { createConsumer } from "../kafka/consumer/consumer.js";
import { TOPICS } from "../kafka/topics.js";
import { WhatsAppService } from "./whatsapp.js";
import { Formatter } from "../utils/formatter.js";
import { MemberRepository } from "../repository/member.js";

export const NotificationService = {
  async init() {
    createConsumer(
      "notification",
      TOPICS.INVENTORY_EVENTS,
      this.handleInventoryEvent
    );
  },

  async handleInventoryEvent(event) {
    const { groupId, items, phone } = event;
    const members = await MemberRepository.getGroupMembers(groupId);
    const reply = Formatter.inventoryAdded(phone, items);
    for (const member of members) {
      await WhatsAppService.sendWhatsAppMessage(member, reply);
    }
  },
};
