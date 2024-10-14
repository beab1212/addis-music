import express from 'express';
import authHandler from '../middleware/authHandler.js';
import { AlbumController } from '../controllers/index.js';
import upload from "../middleware/fileUpload.js";

const router = express.Router();

router.post('/', authHandler, upload.single('album_art'), AlbumController.addAlbum);
router.get('/', authHandler, AlbumController.album);
router.get('/:id', authHandler, AlbumController.albumDetail);


export default router;
