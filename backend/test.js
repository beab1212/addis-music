import { parseFile, selectCover } from 'music-metadata';
import fs from 'fs';

(async () => {
    const { common } = await parseFile('./f47bcac1-b277-455e-8086-cd47456c65b9');
    console.log('============', common);
    const cover = selectCover(common.picture);
    console.log('============', cover.data);

    fs.writeFile('./image.png', cover.data, (err) => {
        if (err) {
            console.error(err);   
        }
        console.log('Music front cover extraction completed');
    })
})();
