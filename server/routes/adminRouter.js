import express from 'express';
import { userAuth, adminAuth } from '../middleware/protect.js';
import { getUsers } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/', userAuth, adminAuth, (req, res) => {
    res.send('Admin Page');
});

adminRouter.get('/users', userAuth, adminAuth, getUsers);
export default adminRouter;