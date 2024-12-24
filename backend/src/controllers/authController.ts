import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import User from '../models/User';
import bcrypt from 'bcrypt';

// User Sign Up
export const signup = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
    } else {

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User signed up successfully', user: newUser });
    }

  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
};

interface AuthInfo {
  message: string;
}

interface AuthenticatedUser {
  username: string;
  password: string;
}

// User Login
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: AuthenticatedUser | false, info: AuthInfo) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials', error: info });
    }

    req.logIn(user, (err: Error) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

// User Logout
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
