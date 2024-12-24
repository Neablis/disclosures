import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import homeRoutes from './routes/homeRoutes';
import chatRoutes from './routes/chatRoutes';
import { isAuthenticated } from './middleware/authMiddleware';
import { requestLogger } from './middleware/requestLogger';
import connectDB from './config/db';

import './config/passport';

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (!process.env.MONGODB_URI) {
  throw new Error('No MONGODB_URI provided');
}

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Public routes
app.use('/api/homes', isAuthenticated, homeRoutes); // Protected routes
app.use('/api/chat', isAuthenticated, chatRoutes); // Protected routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});