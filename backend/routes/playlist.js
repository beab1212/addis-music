import express from 'express';
import path from 'path';
import config from '../config.js';
import authHandler from '../middleware/authHandler.js';
import PlaylistController from '../controllers/playlist.controller.js';
const router = express.Router()

router.use('/asset', authHandler, express.static(path.join(`${config.DATA_PATH}`, 'image')));
router.get('/:id', authHandler, PlaylistController.playlistDetail);
router.get('/', authHandler, PlaylistController.playlist);
// router.post('/', authHandler)

// router.get('/:id', authHandler)

export default router;
