import express from 'express';
import { authRequired } from '../utils/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', authRequired, async (req, res) => {
  const u = req.user;
  res.json({ id: u._id, username: u.username, avatarUrl: u.avatarUrl, online: u.online, lastSeenAt: u.lastSeenAt });
});

router.post('/avatar', authRequired, async (req, res) => {
  const { avatarUrl } = req.body;
  await User.findByIdAndUpdate(req.user._id, { avatarUrl });
  res.json({ success: true });
});

export default router;