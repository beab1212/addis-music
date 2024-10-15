import express from 'express';
import path from 'path';
import config from '../config.js';
import authHandler from '../middleware/authHandler.js';
import upload from "../middleware/fileUpload.js";
import { SongController } from '../controllers/index.js';

const router = express.Router();

router.use('/asset', authHandler, express.static(path.join(`${config.DATA_PATH}`, 'image')));
router.get('/favorite/', authHandler, SongController.favoriteSong);
router.get('/my', authHandler, SongController.userSong);
router.get('/:id', authHandler, SongController.songDetail);
router.get('/', authHandler, SongController.song);
router.post('/', authHandler, upload.fields([{ name: 'song_art', maxCount: 1 }, { name: 'song', maxCount: 1 }]), SongController.addSong);
router.get('/stream/:id/:fileName?', authHandler, SongController.songStream);
router.post('/:id/like', authHandler, SongController.likeSong);
router.delete('/:id', authHandler, SongController.deleteSong);
router.post('/:id', authHandler, SongController.updateSong);

export default router;
