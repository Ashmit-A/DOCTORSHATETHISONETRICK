import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userID) => {
    const payload = { userID };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

export { generateToken };