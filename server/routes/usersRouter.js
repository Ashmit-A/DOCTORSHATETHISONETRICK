import express from 'express';
import { registerUser, getUser } from '../controllers/userController.js';
import { protect } from '../middleware/protect.js';

const usersRouter = express.Router();

usersRouter.get('/', protect, getUser);

usersRouter.post('/register', registerUser);
export default usersRouter;