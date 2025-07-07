import { sqldb } from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../util/generateToken.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await sqldb`SELECT * FROM users WHERE email = ${email}`;
        console.log(existingUser);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists', user:{email} });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await sqldb`
        INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword}) RETURNING *`;
        
        const token = generateToken(result[0].id.toString());
        
        // Set JWT token in httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        res.status(201).json({ success: true, message: 'User registered successfully', user: { name, email }});

    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getUser = async (req, res) => {
    try {
        console.log(req.user);
        const user = await sqldb`SELECT id, name, email, is_admin FROM users WHERE id = ${req.user.userID}`;
        res.status(200).json({ success: true, user: user[0] });
    } catch (error) {
        console.error('Error getting user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { registerUser, getUser };
