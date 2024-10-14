import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errors/index.js';
import config from '../config.js';

const image_fields = ['song_art', 'album_art', 'playlist_art'];

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        console.log('=============== File Controller', file);
        const imagePath = `${config.TMP_PATH}/image`;
        const songPath = `${config.TMP_PATH}/song`;
        
        try {
            if (image_fields.includes(file.fieldname)) {
                // Asynchronously create the image directory if it doesn't exist
                await fs.promises.mkdir(imagePath, { recursive: true });
                return cb(null, imagePath);
            } else if (file.fieldname === 'song') {
                // Asynchronously create the image directory if it doesn't exist
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


const fileFilter = (req, file, cb) => {    
    const allowedImageFileTypes = /jpeg|jpg|png|gif/;
    const allowedAudioFileTypes = /mpeg|mp3|wav|m4a/;

    try {
        if (image_fields.includes(file.fieldname)) {
            const mimetype = allowedImageFileTypes.test(file.mimetype);
            const extname = allowedImageFileTypes.test(path.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                return cb(new CustomError.BadRequest(`Invalid file type! "${file.fieldname}".`));
            }
        } else if(file.fieldname === 'song') {            
            const mimetype = allowedAudioFileTypes.test(file.mimetype);
            const extname = allowedAudioFileTypes.test(path.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                return cb(new CustomError.BadRequest('Invalid file type "song".'));
            }
        } else {
            return cb(new CustomError.BadRequest(`Invalid file field name ${file.fieldname}.!`));
        }
    } catch(err) {
        return cb(new Error('Critical: =============> Unknown file filter error', err));
    }
};

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: fileFilter });

export default upload;
