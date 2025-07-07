import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import listingsRouter from './routes/listingsRouter.js';
import initListingsTable from './models/Listings.js';
import initUserTable from './models/User.js';
import usersRouter from './routes/usersRouter.js';
import { protect } from './middleware/protect.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    // origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Backend Here!');
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/listings', listingsRouter);
app.use('/api/users', usersRouter);

// initListingsTable(); // Commented out to avoid creating the table for the time being
initUserTable();