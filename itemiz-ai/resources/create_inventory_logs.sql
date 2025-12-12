CREATE TABLE IF NOT EXISTS inventory_logs (
    id SERIAL PRIMARY KEY,
    group_id VARCHAR(12) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    change_type VARCHAR(20) NOT NULL,
    quantity REAL,
    unit VARCHAR(20),
    user_phone VARCHAR(20),
    timestamp TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (group_id)
        REFERENCES groups(group_id)
        ON DELETE CASCADE
);
