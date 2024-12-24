import { Router } from 'express';

const router = Router();

// Example route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

export default router;