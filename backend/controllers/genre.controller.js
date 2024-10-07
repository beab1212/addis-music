import { StatusCodes } from 'http-status-codes';
import Genre from '../models/Genre.js';

const GenreController = {
    async availableGenre(req, res) {
        const genres = await Genre.find({}, { name: 1, description: 1});
        return res.status(StatusCodes.OK).json({ success: true, genre: genres });
    }
}

export default GenreController;
