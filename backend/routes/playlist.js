import express from 'express';
import path from 'path';
import config from '../config.js';
import upload from "../middleware/fileUpload.js";
import authHandler from '../middleware/authHandler.js';
import PlaylistController from '../controllers/playlist.controller.js';
const router = express.Router()

router.use('/asset', authHandler, express.static(path.join(`${config.DATA_PATH}`, 'image')));
router.post('/', authHandler, upload.single('playlist_art') , PlaylistController.addPlaylist);
router.get('/:id', authHandler, PlaylistController.playlistDetail);
router.get('/', authHandler, PlaylistController.playlist);
router.post('/:playlist_id/song/:song_id', authHandler, PlaylistController.songToPlaylist);
router.delete('/', authHandler, PlaylistController.deleteFromPlaylist);

export default router;
