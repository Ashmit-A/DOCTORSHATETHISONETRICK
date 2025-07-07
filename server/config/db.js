import { neon } from '@neondatabase/serverless'; // ✅ Correct
import dotenv from 'dotenv';

dotenv.config();

const PGURL = process.env.PGURL;
if (!PGURL) {
    throw new Error('PGURL is not defined in .env file');
}
export const sqldb = neon(PGURL);

//tagged template literal is a way to create a string with variables