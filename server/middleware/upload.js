import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = crypto.randomBytes(8).toString('hex');
    cb(null, `${Date.now()}-${name}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  if (/^image\/(jpe?g|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
}

export const multiUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'localImage', maxCount: 20 },
  { name: 'images', maxCount: 20 }
]);

// Backward compatible default export
export default multer({ storage });

import { addWatermark } from '../utils/watermark.js';

// Middleware that watermarks every uploaded image file
export async function watermarkUploadedImages(req, res, next) {
  try {
    const groups = ['image', 'images', 'localImage'];
    const files = [];
    for (const g of groups) {
      if (Array.isArray(req.files?.[g])) {
        for (const f of req.files[g]) files.push(f.path);
      }
    }
    for (const p of files) {
      await addWatermark(p);
    }
    next();
  } catch (e) {
    console.error('watermarkUploadedImages error:', e);
    next(e);
  }
}
