import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';
import config from '../config.js';
import { moveToDataPath } from '../utils/file.utils.js';
import Album from '../models/Album.js';
import Genre from '../models/Genre.js';
import Keyword from '../models/Keyword.js';
import AlbumSong from '../models/AlbumSong.js';

const AlbumController = {
    async addAlbum(req, res) {
        const user = req.user;

        const album_art = req.file;
        const { title, genre, contributors, description } = req.body;

        if (!title || !req.file, !contributors) {
            throw new CustomError.BadRequest('please provide album information properly');
        }

        if (!album_art) {
            throw new CustomError.BadRequest('album must have album art image');
        }

        // consider that genre is optional
        if (genre && !isValidObjectId(genre))  {
            throw new CustomError.BadRequest('invalid genre id');
        }

        let isGenreExist;
        if (genre && isValidObjectId(genre)) {
            isGenreExist = await Genre.findById(genre);
            if (!isGenreExist) {
                throw new CustomError.BadRequest('selected genre does\'t exist');
            }
        }

        if (contributors && contributors.length > 150) {
            throw new CustomError.BadRequest('to much contributors allowed only 150 characters including ","');
        }

        const contributorsList = contributors.split(',').map((contributor) => {
            return contributor.trim();
        });

        // move to permanent data folder
        const albumArtPath = await moveToDataPath(req.file.path, 'image');

        if (!albumArtPath) {
            throw new CustomError.BadRequest('something is wrong please try again later');
        }

        const newAlbum = new Album({
            title,
            description,
            contributors: contributorsList,
            genre_id: isGenreExist?._id || null,
            album_art: req.file ? req.file.filename : null,
            user_id: user._id
        });
        
        await newAlbum.save();

        const keyword = new Keyword({
            key: `${title}, ${contributors}, ${description}`,
            title: `${title}`,
        });

        await keyword.save();
        
        const newAlbumJson = newAlbum.toObject();
        delete newAlbumJson.__v;

        return res.status(StatusCodes.CREATED).json({ success: true, message: 'Album created successfully add song\'s to it', album: { ...newAlbumJson } });
    },

    async album(req, res) {
        // const user = req.user;
        const { query='' } = req.query;
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

        const pattern = new RegExp(`${query}`, 'i');

        const albums = await Album.aggregate([
            { $match: 
                {$and: [
                    {title: pattern},
                    // { $or: [
                    //     { is_public: {$ne: false}},
                    //     { $and: [{is_public: false}, {user_id: new Types.ObjectId(user._id)}] }
                    // ]}
                ]}
            },
            { $project:{
                title: 1,
                user_id: 1,
                description: 1,
                contributors: 1,
                genre_id: 1,
                createdAt: 1,
                updatedAt: 1,
                album_art: { $concat: [`${config.HOST_ADDRESS}/api/v1/playlist/asset/`, '$album_art']},
            }},
            { $skip: per_page *(page - 1)},
            { $limit: per_page }
        ]);

        return res.status(StatusCodes.OK).json({ success: true, albums });
    },

    async albumDetail(req, res) {
        // const user = req.user;
        const { id='' } = req.params;

        if (!isValidObjectId(id))  {
            throw new CustomError.BadRequest('invalid album id');
        }

        const album = await Album.findById(id, { __v: 0 });

        if (!album) {
            throw new CustomError.BadRequest('album does\'t exist');
        }

        const albumJson = album._doc;
        const songs = await AlbumSong.find({ album_id: album._id }, { song_id: 1, _id: 0 });

        albumJson.playlist_art = `${config.HOST_ADDRESS}/api/v1/playlist/asset/${albumJson.album_art}`;

        return res.status(StatusCodes.OK).json({ success: true, album: { ...albumJson , songs: songs }});
    },

}

export default AlbumController;
