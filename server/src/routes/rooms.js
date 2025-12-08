import express from 'express';
import { authRequired } from '../utils/authMiddleware.js';
import Room from '../models/Room.js';

const router = express.Router();

// Create group room
router.post('/', authRequired, async (req, res) => {
  const { name, memberIds = [] } = req.body;
  const room = await Room.create({ name, isGroup: true, members: [req.user._id, ...memberIds] });
  res.json(room);
});

// List my rooms
router.get('/', authRequired, async (req, res) => {
  const rooms = await Room.find({ members: req.user._id }).populate('members', 'username avatarUrl online');
  res.json(rooms);
});

// Create DM room (two members)
router.post('/dm', authRequired, async (req, res) => {
  const { otherUserId } = req.body;
  const existing = await Room.findOne({ isGroup: false, members: { $all: [req.user._id, otherUserId] } });
  if (existing) return res.json(existing);
  const room = await Room.create({ name: 'DM', isGroup: false, members: [req.user._id, otherUserId] });
  res.json(room);
});

export default router;
