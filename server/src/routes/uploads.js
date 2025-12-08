import express from 'express';
import multer from 'multer';
import { authRequired } from '../utils/authMiddleware.js';
import { initCloudinary } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = initCloudinary();

router.post('/image', authRequired, upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file' });

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'kotha-boli-02', resource_type: 'image' },
      (err, data) => {
        if (err) return res.status(500).json({ error: 'Upload failed' });
        res.json({ url: data.secure_url });
      }
    );

    // write stream
    const stream = result;
    stream.end(file.buffer);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
