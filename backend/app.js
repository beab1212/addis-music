import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());


app.use('/audio', express.static(path.join('./', 'hls')));

app.get('/', async (req, res) => {
    res.send('HLS Audio Streaming Server');
})

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
})


