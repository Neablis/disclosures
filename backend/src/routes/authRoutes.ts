import { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { isAuthenticated } from '../middleware/authMiddleware';

const router = Router();

// Sign Up Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Logout Route
router.post('/logout', isAuthenticated, logout);

export default router;