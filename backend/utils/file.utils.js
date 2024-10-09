import fs from 'fs';
import Queue from 'bull';
import path from 'path';
import config from '../config.js';

// creating queue for thumbnail creation
const imageQueue = new Queue('imageProcessing');
const dataPath = config.DATA_PATH;

const allowedTypes = ['image', 'song']

const moveToDataPath = async (sourcePath, type) => {
    if (!allowedTypes.includes(type)) {
        return null;
    }

    const paths = sourcePath.split('/');
    const filename = paths[paths.length - 1];

    const destinationPath = path.join(dataPath, `${type}/${filename}`);
    
    return new Promise((resolve, reject) => {
        fs.rename(sourcePath, destinationPath, (err) => {
            if (err) {
                reject(null);
            }
            if (type === 'image') {
                // add queue to thumbnail
                imageQueue.add({ imagePath: destinationPath })
            }
            resolve(destinationPath);
        });
    });
};

export { moveToDataPath }

