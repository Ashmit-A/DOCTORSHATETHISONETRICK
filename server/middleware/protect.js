import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sqldb } from '../config/db.js';

dotenv.config();

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await sqldb`SELECT id, name, email, is_admin FROM users WHERE id = ${decoded.userID}`;
        req.user = user[0];
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        next();

    } 
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired.' });
        } else {
            console.error('JWT verification error:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export const adminAuth = (req, res, next) => {
    if(!req.user.is_admin || !req.user) {
        return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
    next();
}