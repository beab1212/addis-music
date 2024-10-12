import { StatusCodes } from 'http-status-codes';
import config from '../config.js';
import Genre from '../models/Genre.js';


const GenreController = {
    async availableGenre(req, res) {
        // const genres = await Genre.find({}, { name: 1, description: 1, image: 1 });

        const genres = await Genre.aggregate([
            { $match: {}},
            { $project:{
                name: 1,
                description: 1,
                createdAt: 1,
                updatedAt: 1,
                image: { $concat: [`${config.HOST_ADDRESS}/api/v1/playlist/asset/`, '$image']},
            }}
        ]);

        return res.status(StatusCodes.OK).json({ success: true, genre: genres });
    }
}

export default GenreController;
