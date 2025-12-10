import express from "express";
import { authRequired } from "../utils/authMiddleware.js";
import Room from "../models/Room.js";

const router = express.Router();

/**
 * Create a group room
 */
router.post("/", authRequired, async (req, res) => {
  try {
    const { name, memberIds = [] } = req.body;
    const room = await Room.create({
      name,
      isGroup: true,
      members: [req.user._id, ...memberIds],
    });
    res.json(room);
  } catch (err) {
    console.error("Error creating group room:", err);
    res.status(500).json({ error: "Failed to create group room" });
  }
});

/**
 * List all rooms for the logged-in user
 */
router.get("/", authRequired, async (req, res) => {
  try {
    const rooms = await Room.find({ members: req.user._id }).populate(
      "members",
      "username avatarUrl online"
    );
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

/**
 * Create a DM room (two members)
 */
router.post("/dm", authRequired, async (req, res) => {
  try {
    const { otherUserId } = req.body;

    // Check if DM room already exists
    const existing = await Room.findOne({
      isGroup: false,
      members: { $all: [req.user._id, otherUserId] },
    });

    if (existing) {
      return res.json(existing);
    }

    // Create new DM room
    const room = await Room.create({
      name: "DM",
      isGroup: false,
      members: [req.user._id, otherUserId],
    });

    res.json(room);
  } catch (err) {
    console.error("Error creating DM room:", err);
    res.status(500).json({ error: "Failed to create DM room" });
  }
});

export default router;
