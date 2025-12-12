import { GroupRepository } from "../repository/group.js";
import { MemberRepository } from "../repository/member.js";
import { generateGroupId } from "../utils/idGenerator.js";
import { Formatter } from "../utils/formatter.js";

export const GroupService = {
  async createGroup(name, phone) {
    const groupId = generateGroupId();

    const group = await GroupRepository.createGroup(groupId, name, phone);
    await MemberRepository.addMember(groupId, phone);

    return group;
  },

  async joinGroup(groupId, phone) {
    const group = await GroupRepository.getGroup(groupId);
    if (!group) return null;

    await MemberRepository.addMember(groupId, phone);
    return group;
  },

  async handleCreateGroup(phone, parsed) {
    const name = parsed.group_name || "My Inventory";
    const group = await GroupService.createGroup(name, phone);
    return Formatter.groupCreated(group);
  },

  async handleJoinGroup(phone, parsed) {
    const groupId = parsed.group_id;
    if (!groupId) return Formatter.missingGroupId();

    const group = await GroupService.joinGroup(groupId, phone);
    if (!group) return Formatter.groupNotFound();

    return Formatter.groupJoined(group);
  },
};
