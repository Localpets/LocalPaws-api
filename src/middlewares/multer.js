import multer from 'multer';
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: join(__dirname, `../uploads/assets/chatsImage/${Date.now()}`),
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, fileName);
    }
  });

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // Establece el límite de tamaño
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido'));
    }
  },
}).single('image');

export default upload;