import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function authRequired(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.uid);
    if (!user) return res.status(401).json({ error: 'Invalid user' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
