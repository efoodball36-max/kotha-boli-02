import http from 'http';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { initSockets } from './sockets/index.js';
import { initCloudinary } from './config/cloudinary.js';

async function start() {
  try {
    await connectDB();
    initCloudinary();

    const app = createApp();
    const server = http.createServer(app);
    initSockets(server, process.env.CLIENT_ORIGIN);

    const port = process.env.PORT || 8080;
    server.listen(port, () => console.log(`Server running on ${port}`));
  } catch (e) {
    console.error('Startup error', e);
    process.exit(1);
  }
}

start();
