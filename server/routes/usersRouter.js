import express from 'express';
import { registerUser, getUser, loginUser, logoutUser } from '../controllers/userController.js';
import { userAuth } from '../middleware/protect.js';

const usersRouter = express.Router();

usersRouter.get('/', userAuth, getUser);
usersRouter.get('/userdata', userAuth, getUser);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.get('/logout', logoutUser);
export default usersRouter;