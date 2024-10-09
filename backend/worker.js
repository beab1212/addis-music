// import Queue from 'bull/lib/queue.js';
import Queue from 'bull';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import config from './config.js';

// connect to imageProcessing queue
const imageQueue = new Queue('imageProcessing');
const dataPath = config.DATA_PATH;
const resolutions = [200, 400, 600];

imageQueue.process(async (job) => {
    const { imagePath } = job.data;

    try {
        const imageBuffer = fs.readFileSync(imagePath);

        for (const width of resolutions) {
            const outputPath = path.join(dataPath, `image/${path.basename(imagePath)}_${width}`);

            await sharp(imageBuffer).resize({ width }).toFormat('jpeg').toFile(outputPath);
            console.log(`Thumbnail created: ${outputPath}`); 
        }

    } catch(err) {
        console.error(`Error processing image: ${imagePath}`, error);
    }
});

console.log('Image processor queue started');

