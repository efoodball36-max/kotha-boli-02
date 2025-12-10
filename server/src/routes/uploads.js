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

    // Cloudinary upload via stream
    const uploadPromise = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'kotha-boli-02', resource_type: 'image' },
          (err, data) => (err ? reject(err) : resolve(data))
        );
        stream.end(file.buffer);
      });

    const result = await uploadPromise();
    return res.json({ url: result.secure_url });
  } catch (e) {
    console.error('Upload error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;