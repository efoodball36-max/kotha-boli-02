import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import roomsRoutes from './routes/rooms.js';
import messagesRoutes from './routes/messages.js';
import uploadsRoutes from './routes/uploads.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('tiny'));

  app.get('/', (req, res) => res.json({ ok: true, name: 'kotha-boli-02' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/rooms', roomsRoutes);
  app.use('/api/messages', messagesRoutes);
  app.use('/api/uploads', uploadsRoutes);

  return app;
}
