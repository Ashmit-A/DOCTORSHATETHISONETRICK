import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import listingsRouter from './routes/listingsRouter.js';
import initListingsTable from './models/Listings.js';
import initUserTable from './models/User.js';
import usersRouter from './routes/usersRouter.js';
import adminRouter from './routes/adminRouter.js';
import { aj } from './lib/arcjet.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// CORS configuration - allow frontend origin
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Initialize database tables
// initListingsTable();
initUserTable();

// Temporarily disable arcjet to test CORS
app.use(async (req, res, next) => {
    try {
        const descision = await aj.protect(req, {
            requested: 1,
        });
        if (descision.isDenied()) {
            if (descision.reason.isRateLimit()) {
                res.status(429).json({ message: "Too many requests" });
            }
            else if (descision.reason.isBot()) {
                res.status(403).json({ message: "Bot attack detected" });
            }
            else {
                res.status(403).json({ message: "Forbidden" });
            }
            return 
        }
        next();
    } catch (error) {
        console.error('Error in arcjet', error);
        next(error);
    }
});

// Routes - must be defined before app.listen()
app.get('/', (req, res) => {
    res.send('Backend Here!');
});
app.use('/api/users', usersRouter);
app.use('/admin', adminRouter);
// app.use('/api/listings', listingsRouter);
// Start server
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});