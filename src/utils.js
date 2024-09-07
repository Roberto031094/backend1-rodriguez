import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'img')); 
    },
    filename: function(req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`); 
    }
});

export const uploader = multer({ storage });
