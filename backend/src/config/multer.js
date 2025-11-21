import multer from "multer";
import fs from 'fs';

export const createUpload = (subfolder) => {
  const dir = `./uploads/${subfolder}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });

  return multer({ storage });
};