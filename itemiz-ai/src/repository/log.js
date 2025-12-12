import { pool } from "../config/db.js";
import { CREATE_LOG } from "../constants/query.js";

export const LogRepository = {
  async addLog(groupId, itemName, changeType, qty, unit, phone) {
    await pool.query(CREATE_LOG, [
      groupId,
      itemName,
      changeType,
      qty,
      unit,
      phone,
    ]);
  },
};
