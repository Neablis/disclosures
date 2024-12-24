import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      console.log('Body:', req.body);
    }
  }
  next();
}