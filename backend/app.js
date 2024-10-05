import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.js'
import connectDB from './db/connect.js';

const app = express();
app.use(cors());
app.use(morgan())


app.use('/audio', express.static(path.join('./', 'hls')));

app.get('/', async (req, res) => {
    res.send('HLS Audio Streaming Server');
})



const main = async () => {
    await connectDB(config.DB_URL).then(() => {
        console.log('connected to db successfully');
    }).catch((err) => {
        console.log('error to connect to db ', err);
    })

    app.listen(config.PORT, () => {
        console.log(`Server is running on port 5000`);
    })
}

main()
