import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isStrongPassword, isUsernameValid } from "../utils/validators.js";

const router = express.Router();

/**
 * Register a new user (first-time setup)
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password
    if (!isUsernameValid(username)) {
      return res.status(400).json({ error: "Invalid username" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "Weak password" });
    }

    // Check if username already exists
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ error: "Username taken" });
    }

    // Hash password and create user
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash: hash });

    // Generate JWT token
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * Login an existing user
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
