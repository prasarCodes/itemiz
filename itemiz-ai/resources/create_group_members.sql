CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id VARCHAR(12) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    joined_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE (group_id, phone),
    
    FOREIGN KEY (group_id)
        REFERENCES groups(group_id)
        ON DELETE CASCADE
);
