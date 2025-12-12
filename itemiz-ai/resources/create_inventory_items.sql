CREATE TABLE IF NOT EXISTS inventory_items (
    id SERIAL PRIMARY KEY,
    group_id VARCHAR(12) NOT NULL,
    name VARCHAR(100) NOT NULL,
    quantity REAL DEFAULT 0,
    unit VARCHAR(20),
    expiry_date DATE DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (group_id, name),

    FOREIGN KEY (group_id)
        REFERENCES groups(group_id)
        ON DELETE CASCADE
);
