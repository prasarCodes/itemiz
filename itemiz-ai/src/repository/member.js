import { pool } from "../config/db.js";
import {
  CREATE_GROUP_MEMBER,
  GET_GROUP_MEMBERS,
  GET_USER_GROUP,
} from "../constants/query.js";

export const MemberRepository = {
  async addMember(group_id, phone) {
    try {
      const result = await pool.query(CREATE_GROUP_MEMBER, [group_id, phone]);
      return result.rows[0];
    } catch (err) {
      console.error("Member create error:", err);
      throw err;
    }
  },

  async getGroupMembers(group_id) {
    try {
      const result = await pool.query(GET_GROUP_MEMBERS, [group_id]);
      return result.rows.map((r) => r.phone);
    } catch (err) {
      console.error("Member get error:", err);
      throw err;
    }
  },

  async userGroup(phone) {
    try {
      const result = await pool.query(GET_USER_GROUP, [phone]);
      return result.rows[0]?.group_id || null;
    } catch (err) {
      console.error("Member get error:", err);
      throw err;
    }
  },
};
