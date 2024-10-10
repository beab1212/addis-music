import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import config from './config.js';
import connectDB from './db/connect.js';
import redisClient from './db/redis.js';
import errorHandler from './middleware/errorHandler.js';

import { AuthRoute, SearchRoute, SongRoute, GenreRoute, PlaylistRoute } from './routes/index.js';

const app = express();
// app.use(rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
// }));
// app.use(cors());
app.use(cors({
    origin: 'http://192.168.1.1:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(mongoSanitize())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(config.JWT_SECRET));
app.use(morgan());

const router = express.Router();

app.use('/audio', express.static(path.join('./', 'hls')));

app.get('/', async (req, res) => {
    res.send('HLS Audio Streaming Server');
})

app.use('/api/v1', router);
router.use('/auth', AuthRoute);
router.use('/search', SearchRoute);
router.use('/song', SongRoute);
router.use('/genre', GenreRoute);
router.use('/playlist', PlaylistRoute);

app.use(errorHandler);
app.use("*", async (req, res) => {
    console.log("404 page reached");
    res.status(404).json({success: false, error: "Page doesn't exist"});
});

const main = async () => {
    await connectDB(config.DB_URL).then(() => {
        console.log('Connected to mongos db server');
    }).catch((err) => {
        console.error('Error to connect to db ', err);
    });

    await redisClient.connect();

    app.listen(config.PORT, () => {
        console.log(`Server is running on port 5000`);
    });

    console.log(`===========> Worker must run to handle thumbnail generation`);
    console.log(`===========> run node worker.js`);
}

main();
