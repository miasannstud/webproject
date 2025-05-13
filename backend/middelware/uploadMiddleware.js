import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const sanitized = sanitizeFilename(file.originalname);
    const extension = path.extname(sanitized);
    const base = path.basename(sanitized, extension);
    if (base.length > 60) {
      base = base.substring(0, 60);
    }
    const uniqueName = Date.now() + '-' + sanitized;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage,
  limits: { fileSize: 40 * 1024 * 1024 }
 }).array('artifact', 10);

export default upload; 