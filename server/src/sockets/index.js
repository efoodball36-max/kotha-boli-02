import { Server } from 'socket.io';
import User from '../models/User.js';
import Message from '../models/Message.js';

export function initSockets(httpServer, corsOrigin) {
  const io = new Server(httpServer, {
    cors: { origin: corsOrigin, credentials: true }
  });

  io.use(async (socket, next) => {
    // parse userId from query (simple auth for socket layer)
    const { userId } = socket.handshake.auth || {};
    if (!userId) return next(new Error('No userId'));
    socket.data.userId = userId;
    next();
  });

  io.on('connection', async (socket) => {
    const userId = socket.data.userId;
    await User.findByIdAndUpdate(userId, { online: true, lastSeenAt: new Date() });
    io.emit('presence:update', { userId, online: true });

    socket.on('room:join', (roomId) => {
      socket.join(roomId);
    });

    socket.on('message:send', async ({ roomId, text, imageUrl }) => {
      const msg = await Message.create({
        room: roomId,
        sender: userId,
        text: text || '',
        imageUrl: imageUrl || '',
        sentAt: new Date()
      });
      const populated = await msg.populate('sender', 'username avatarUrl');
      io.to(roomId).emit('message:new', populated);
    });

    socket.on('message:react', async ({ messageId, emoji }) => {
      const msg = await Message.findById(messageId);
      if (!msg) return;
      const allowed = ['👍', '❤️', '🤔', '🥺', '🤣'];
      if (!allowed.includes(emoji)) return;
      const exists = msg.reactions.find(r => String(r.by) === String(userId) && r.emoji === emoji);
      if (exists) {
        msg.reactions = msg.reactions.filter(r => !(String(r.by) === String(userId) && r.emoji === emoji));
      } else {
        msg.reactions.push({ emoji, by: userId });
      }
      await msg.save();
      io.to(String(msg.room)).emit('message:react:update', { messageId, reactions: msg.reactions });
    });

    socket.on('disconnect', async () => {
      await User.findByIdAndUpdate(userId, { online: false, lastSeenAt: new Date() });
      io.emit('presence:update', { userId, online: false });
    });
  });

  return io;
}