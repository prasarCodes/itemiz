import { pool } from "../config/db.js";
import { CREATE_GROUP, GET_GROUP } from "../constants/query.js";

export const GroupRepository = {
  async createGroup(groupId, name, createdBy) {
    try {
      const result = await pool.query(CREATE_GROUP, [groupId, name, createdBy]);
      return result.rows[0];
    } catch (err) {
      console.error("Group create error:", err);
      throw err;
    }
  },

  async getGroup(groupId) {
    try {
      const result = await pool.query(GET_GROUP, [groupId]);
      return result.rows[0];
    } catch (err) {
      console.error("Group get error:", err);
      throw err;
    }
  },
};
