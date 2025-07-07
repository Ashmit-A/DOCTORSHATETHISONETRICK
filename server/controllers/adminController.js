import { sqldb } from '../config/db.js';


const getUsers = async (req, res) => {
    try {
        const users = await sqldb`SELECT id, name, email, is_admin FROM users`;
        res.status(200).json({ success: true, users: users });
    } catch (error) {
        console.error('Error getting user', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { getUsers };