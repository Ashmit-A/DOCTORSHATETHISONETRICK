import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
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