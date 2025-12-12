export const CREATE_GROUP = `INSERT INTO groups (group_id, name, created_by)
      VALUES ($1, $2, $3)
      RETURNING *;`;

export const GET_GROUP = `SELECT * FROM groups WHERE group_id = $1;`;

export const CREATE_GROUP_MEMBER = `INSERT INTO group_members (group_id, phone)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      RETURNING *;`;

export const GET_GROUP_MEMBERS = `SELECT phone FROM group_members WHERE group_id=$1`;

export const GET_USER_GROUP = `SELECT group_id FROM group_members WHERE phone=$1 LIMIT 1`;

export const GET_ITEM = `SELECT * FROM inventory_items WHERE group_id=$1 AND name=$2`;

export const CREATE_ITEM = `INSERT INTO inventory_items (group_id, name, quantity, unit)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`;

export const UPDATE_ITEM = `UPDATE inventory_items
      SET quantity=$1, updated_at=NOW()
      WHERE group_id=$2 AND name=$3
      RETURNING *;`;

export const GET_ALL_ITEMS = `SELECT * FROM inventory_items WHERE group_id=$1`;

export const CREATE_LOG = `INSERT INTO inventory_logs (group_id, item_name, change_type, quantity, unit, user_phone)
      VALUES ($1, $2, $3, $4, $5, $6);`;
