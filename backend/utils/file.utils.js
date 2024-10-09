import fs from 'fs';
import Queue from 'bull';
import path from 'path';
import config from '../config.js';

// creating queue for thumbnail creation
const imageQueue = new Queue('imageProcessing');
const dataPath = config.DATA_PATH;

const allowedTypes = ['image', 'song']

for (const type of allowedTypes) {
    if (!fs.existsSync(path.join(dataPath, type))) {
        fs.mkdirSync(path.join(dataPath, type), { recursive: true });
    }
}

const moveToDataPath = async (sourcePath, type) => {
    if (!allowedTypes.includes(type)) {
        return null;
    }

    const paths = sourcePath.split('/');
    const filename = paths[paths.length - 1];

    const destinationPath = path.join(dataPath, `${type}/${filename}`);

    fs.ensureDirSync(dataPath);

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

