import { Router } from 'express';

const router = Router();

// Example route
router.get('/chat', (req, res) => {
  res.send('Example response');
});

export default router;