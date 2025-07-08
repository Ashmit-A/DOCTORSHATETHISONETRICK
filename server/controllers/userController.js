import { sqldb } from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../util/generateToken.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await sqldb`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists', user:{email:email.toLowerCase()} });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await sqldb`
        INSERT INTO users (name, email, password) VALUES (${name}, ${email.toLowerCase()}, ${hashedPassword}) RETURNING *`;
        
        const token = generateToken(result[0].id.toString());
        
        // Set JWT token in httpOnly cookie
        res.cookie('jwt_token', token, {
            httpOnly: true,
            secure: false, // Only send over HTTPS in production
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully', 
            user: { 
                id: result[0].id,
                name, 
                email: email.toLowerCase(),
                is_verified: result[0].is_verified || false,
                is_admin: result[0].is_admin || false
            }
        });

    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) { 
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const userExists = await sqldb`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;
        if (userExists.length === 0 || !userExists) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = userExists[0];
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = generateToken(user.id.toString());
        
        // Set JWT token in httpOnly cookie
        res.cookie('jwt_token', token, {
            httpOnly: true,
            secure: false, // Only send over HTTPS in production
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email.toLowerCase(), 
                is_verified: user.is_verified || false,
                is_admin: user.is_admin 
            }
        });

    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const logoutUser = async (req, res) => {
    try {
        // Clear the JWT token cookie by setting it to expire immediately
        res.clearCookie('jwt_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const getUser = async (req, res) => {
    try {
        // console.log(req.user);
        const user = await sqldb`SELECT id, name, email, is_verified, is_admin FROM users WHERE id = ${req.user.id}`;
        res.status(200).json({ success: true, user: user[0] });
    } catch (error) {
        console.error('Error getting user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { registerUser, loginUser, logoutUser, getUser };
