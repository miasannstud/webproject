import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    file.originalName = file.originalname; // Save the original name
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload.single('artifact'); // Ensure 'artifact' matches the frontend form field name