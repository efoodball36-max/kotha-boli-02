import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isStrongPassword, isUsernameValid } from '../utils/validators.js';

const router = express.Router();

// First-time setup: create username + password
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!isUsernameValid(username)) return res.status(400).json({ error: 'Invalid username' });
    if (!isStrongPassword(password)) return res.status(400).json({ error: 'Weak password' });

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Username taken' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash: hash });
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({ token, user: { id: user._id, username: user.username, avatarUrl: user.avatarUrl } });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Login on another device
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, username: user.username, avatarUrl: user.avatarUrl } });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;