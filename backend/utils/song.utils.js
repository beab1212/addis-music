import { parseFile } from 'music-metadata';
import { access as existsAsync } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import config from '../config.js';
import { exec } from 'child_process';


const hlsFolder = config.HLS_PATH;
const dataFolder = config.DATA_PATH;
// create the required directory if doesn't exist
fs.mkdir(hlsFolder, { recursive: true }, (err) => {
    if (err) {
        console.log('Can\'t able to create hls folder');
        console.error(err);
    }
});
fs.mkdir(`${dataFolder}/image`, { recursive: true }, (err) => {
    if (err) {
        console.log('Can\'t able to create image folder');
        console.error(err);
    }
});
fs.mkdir(`${dataFolder}/song`, { recursive: true }, (err) => {
    if (err) {
        console.log('Can\'t able to create song folder');
        console.error(err);
    }
});



const getAudioDuration = async (filePath) => {
    try {
        const metadata = await parseFile(filePath);
        return metadata.format.duration;
    } catch(err) {
        console.error(err.message);
        return null;
    }
}

const isHlsAudioExist = async (filePath) => {
    try {
        await existsAsync(filePath);
        return true;
    } catch(err) {
        return false;
    }
}

const generateHLSStream = async (song, fileName) => {    
    const outputDir = path.join(hlsFolder, `${song}`);
    const sourceFilePath = path.join(dataFolder, `song/${fileName}`);

    const command = `ffmpeg -i ${sourceFilePath} -vn -c:a copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputDir}/output.m3u8`;

    fs.mkdirSync(outputDir, { recursive: true });

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('=========================Error generating HLS stream=========================',);
                reject(null)
            } else {
                resolve(true)
            }
        });
    })
}

// const filesTypes = ['image', 'audio']

// const uploadToDestination = async(filesPath, type) => {
//     if (!filesTypes.includes(type)) {
//         return false;
//     }

//     if (!fs.existsSync(filesPath)) {
//         return false;
//     }

//     const destinationPath = type === 'image' ? `${dataFolder}/image` : `${dataFolder}/song`;

//     fs.copyFile(filesPath, destinationPath, (err) => {
//         if (err) {
//             return false;
//         }
//     })

//     return true;
// }

export { getAudioDuration, isHlsAudioExist, generateHLSStream };
