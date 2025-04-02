import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, artifact, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, artifact, cb) {
    cb(null, Date.now() + '-' + artifact.originalname);
  }
});

const upload = multer({ storage });

export default upload.single('artifact');