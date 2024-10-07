import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import config from '../config.js';

const image_fields = ['song_art', 'album_art'];

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        console.log(file, '===============');
        const imagePath = `${config.DATA_PATH}/image`;
        const songPath = `${config.DATA_PATH}/song`;
        
        try {
            if (image_fields.includes(file.fieldname)) {
                // Asynchronously create the image directory if it doesn't exist
                await fs.promises.mkdir(imagePath, { recursive: true });
                return cb(null, imagePath);
            } else if (file.fieldname === 'song') {
                await fs.promises.mkdir(songPath, { recursive: true });
                return cb(null, songPath);
            }
        } catch(err) {
            cb(err, null);
        }
        
    },

    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename);
    }
});

// NOTE: not integrated yet
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb('Error: File upload only supports the following file types - ' + fileTypes);
    }
};

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

export default upload;
