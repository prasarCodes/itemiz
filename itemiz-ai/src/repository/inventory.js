import { pool } from "../config/db.js";
import {
  CREATE_ITEM,
  GET_ALL_ITEMS,
  GET_ITEM,
  UPDATE_ITEM,
} from "../constants/query.js";

export const InventoryRepository = {
  async findItem(groupId, name) {
    const result = await pool.query(GET_ITEM, [groupId, name]);
    return result.rows[0];
  },

  async addItem(groupId, name, qty, unit) {
    const result = await pool.query(CREATE_ITEM, [groupId, name, qty, unit]);
    return result.rows[0];
  },

  async updateQuantity(groupId, name, qty) {
    const result = await pool.query(UPDATE_ITEM, [qty, groupId, name]);
    return result.rows[0];
  },

  async getAll(groupId) {
    const result = await pool.query(GET_ALL_ITEMS, [groupId]);
    return result.rows;
  },
};
