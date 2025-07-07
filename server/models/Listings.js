import { sqldb } from '../config/db.js';

async function initListingsTable() {
    try {
        const result = await sqldb`
        CREATE TABLE IF NOT EXISTS listings (
        id SERIAL PRIMARY KEY,
        owner VARCHAR(100) NOT NULL,
        title VARCHAR(150) NOT NULL,
        price INT NOT NULL,
        bhk INT DEFAULT 0,
        furnished VARCHAR(100) DEFAULT 'Unfurnished',
        distance_from_college DECIMAL(5, 2) DEFAULT 0.00,
        brokerage BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

        if (result.length === 0) {
            console.log('Listings table already exists');
        } else {
            console.log('Listings table created');
        }

    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

export default initListingsTable;