import { StatusCodes } from 'http-status-codes';
import { isValidObjectId, Types } from 'mongoose';
import config from '../config.js';
import CustomError from '../errors/index.js';
import Song from '../models/Song.js';
import Playlist from '../models/Playlist.js';
import Genre from '../models/Genre.js'
// Todo: try to powered with AI

const ForyouAndDiscover = {
    async foryou(req, res) {
        const user = req.user;

        throw new CustomError.BadRequest('End point not implemented yet')
    },

    async discover(req, res) {
        // /discover?query=...
        const user = req.user;
        const { query='' } = req.query;
        let { genre='' } = req.query;
        let { page=1, per_page=20 } = req.query;
        try {
            page = Math.ceil(parseInt(page));
            per_page = Math.ceil(parseInt(per_page));
        } catch(parseErr) {
            throw new CustomError.BadRequest('page and per_page must be type integer');
        }

        if (isNaN(page)  || isNaN(per_page)) {
            throw new CustomError.BadRequest('page and per_page must be type integer');
        }

        genre = isValidObjectId(genre) ? new Types.ObjectId(genre) : '';
        let genreName;
        if (genre !== '') {
            genreName = await Genre.findById(genre)
        }

        const pattern = new RegExp(`${query}`, 'i');
        const patternStart = new RegExp(`^${query}`, 'i');

        const playlists = await Playlist.aggregate([
            { $match: 
                {$and: [
                    {name: pattern},    
                    { $or: [
                        { is_public: {$ne: false}},
                        { $and: [{is_public: false}, {user_id: new Types.ObjectId(user._id)}] }
                    ]}
                ]}
            },
            { $project:{
                name: 1,
                user_id: 1,
                is_public: 1,
                createdAt: 1,
                updatedAt: 1,
                playlist_art: { $concat: [`${config.HOST_ADDRESS}/api/v1/playlist/asset/`, '$playlist_art']},
            }},
        ]).skip(Math.ceil((per_page * 25) / 100) *(page - 1)).limit(Math.ceil((per_page * 25) / 100));
        // Playlist will be 25% of the per_page
        // if user request 20 per_page playlist will be 5

        const songs = await Song.aggregate([
            { $match:
                !isValidObjectId(genre) ? {
                    $or: [
                        { title: {$regex: pattern}},
                        { description: {$regex: pattern}},
                        { contributors: {$regex: patternStart}},
                    ]} : {
                    $and: [
                        {$or: [
                            { title: {$regex: pattern}},
                            { description: {$regex: pattern}}
                        ]},
                        { genre: genre },
                    ]
                }
            },
            { $project:{
                title: 1,
                song: 1,
                user_id: 1,
                description: 1,
                contributors: 1,
                genre: 1,
                // not import when app is once deployed
                // only stream_url: 1
                stream_url: { $concat: [`${config.HOST_ADDRESS}/api/v1/song/stream/`, { $toString:'$_id'}, '/']},
                createdAt: 1,
                updatedAt: 1,
                song_art: { $concat: [`${config.HOST_ADDRESS}/api/v1/song/asset/`, '$song_art']},
                duration: { $concat: [{ $toString: "$duration" }, ] }
            }},
            { $skip: per_page *(page - 1)},
            { $limit: per_page }
        ]);

        if (songs.length === 0 && playlists.length === 0) {
            return res.status(StatusCodes.NO_CONTENT).json({ success: true});
        }

        return res.status(StatusCodes.OK).json({ success: true, discover: { songs, playlists } });
    }
}

export default ForyouAndDiscover;
