import { sqldb } from '../config/db.js';

async function initUserTable() {
    try {
        const result = await sqldb`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL UNIQUE,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) PRIMARY KEY NOT NULL,
        password VARCHAR(100) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        console.log('User table available');

    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

export default initUserTable;