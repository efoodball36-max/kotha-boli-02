import express from 'express';
import { authRequired } from '../utils/authMiddleware.js';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/:roomId', authRequired, async (req, res) => {
  const msgs = await Message.find({ room: req.params.roomId })
    .sort({ sentAt: 1 })
    .populate('sender', 'username avatarUrl');
  res.json(msgs);
});

export default router;
