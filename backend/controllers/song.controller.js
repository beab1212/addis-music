import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';
import path from 'path';
import config from '../config.js';
import CustomError from '../errors/index.js';
import { getAudioDuration, isHlsAudioExist, generateHLSStream } from '../utils/song.utils.js';
import Song from '../models/Song.js';
import Genre from '../models/Genre.js';
import Album from '../models/Album.js';

const hlsFolder = config.HLS_PATH;

const SongController = {
    async addSong(req, res) {
        const user = req.user;
        const { song_art, song } = req.files;
        const { album } = req.query;
        const { title, genre, contributors, description } = req.body;

        if (!title || !genre || !req.files.song) {
            throw new CustomError.BadRequest('please provide song information properly');
        }

        if (!song_art) {
            throw new CustomError.BadRequest('songs must have song art image');
        }

        if (!song) {
            throw new CustomError.BadRequest('audio file must be included to create a new song');
        }

        if (!isValidObjectId(genre))  {
            throw new CustomError.BadRequest('invalid genre id');
        }

        const isGenreExist = await Genre.findById(genre);

        if (!isGenreExist) {
            throw new CustomError.BadRequest('selected genre does\'t exist');
        }

        if (contributors && contributors.length > 150) {
            throw new CustomError.BadRequest('to much contributors allowed only 150 characters including ","');
        }

        const contributorsList = contributors.split(',').map((contributor) => {
            return contributor.trim();
        });     

        const newSong = new Song({
            title,
            description,
            contributors: contributorsList,
            genre: isGenreExist._id,
            song: req.files?.song[0].filename,
            duration: await getAudioDuration(req.files.song[0]?.path),
            song_art: req.files?.song_art ? req.files?.song_art[0].filename : null,
            user_id: user._id
        });

        newSong.stream_url = `http://localhost:5000/api/v1/song/stream/${newSong._id}/`;

        if (album) {
            if (!isValidObjectId(album)) {
                throw new CustomError.BadRequest('invalid genre id');
            }
            const isAlbumExists = await Album.findById(album);

            if (!isAlbumExists) {
                throw new CustomError.BadRequest('selected album does\'t exist');
            }
            newSong.album_id = album;
        }

        // TODO: image thumbnails with different resolution 

        await newSong.save();
        
        const newSongJson = newSong.toObject();
        delete newSongJson.song;
        delete newSongJson.__v;

        return res.status(StatusCodes.CREATED).json({ success: true, message: 'Song created successfully', song: { ...newSongJson, duration: parseFloat(newSong.duration) } });
    },

    async song(req, res){
        const { query='' } = req.query;
        let { page=1, per_page=20 } = req.query;
        try {
            page = parseInt(page);
            per_page = parseInt(per_page);
        } catch(parseErr) {
            throw new CustomError.BadRequest('page and per_page must be type integer');
        }
        const pattern = new RegExp(`${query}`, 'i');
        const patternStart = new RegExp(`^${query}`, 'i');

        const songs = await Song.aggregate([
            { $match:
                { $or: [
                    { title: {$regex: pattern}},
                    { description: {$regex: pattern}},
                    { contributors: {$regex: patternStart}},
                ]}
            },
            { $project:{
                title: 1,
                song: 1,
                user_id: 1,
                description: 1,
                contributors: 1,
                genre: 1,
                stream_url: 1,
                createdAt: 1,
                updatedAt: 1,
                song_art: { $concat: ['http://localhost:5000/api/v1/song/asset/', '$song_art']},
                duration: { $concat: [{ $toString: "$duration" }, ] }
            }},
            { $skip: per_page *(page - 1)},
            { $limit: per_page }
        ]);
        
        if (!songs) {
            return res.status(StatusCodes.OK).join({ success: true, songs: [] })
        }

        return res.status(StatusCodes.OK).json({ success: true, songs });
    },

    async songDetail(req, res){
        const { id='' } = req.params;

        if (!isValidObjectId(id))  {
            throw new CustomError.BadRequest('invalid song id');
        }

        const song = await Song.findById(id);
        
        if (!song) {
            throw new CustomError.BadRequest('requested song doesn\'t exist');
        }

        const transformedSong = song.toObject();
        transformedSong.duration = parseFloat(transformedSong.duration);
        transformedSong.song_art = `http://localhost:5000/api/v1/song/asset/${transformedSong.song_art}`;
        delete transformedSong.__v;

        return res.status(StatusCodes.OK).json({ success: true, song: { ...transformedSong } });
    },

    async songStream(req, res) {
        // /song/stream/:id/:fileName
        const { id='', fileName=null } = req.params;

        if (!isValidObjectId(id))  {
            throw new CustomError.BadRequest('invalid song id');
        }

        const songFolder = path.join(hlsFolder, id);
        const m3u8FilePath = path.join(songFolder, 'output.m3u8');
        const segmentPath = fileName ? path.join(songFolder, fileName) : m3u8FilePath;

        try {
            if (fileName && !(await isHlsAudioExist(segmentPath))) {
                throw new CustomError.BadRequest('stream segment out of scope or undefined');
            }

            if (!(await isHlsAudioExist(m3u8FilePath))) {
                console.log('=================================== not Exist',);
                const song = await Song.findById(id);
        
                if (!song) {
                    return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'requested song doesn\'t exist' })
                }
                await generateHLSStream(song._id, song.song);
            }
            res.status(StatusCodes.OK).sendFile(segmentPath);
        } catch(err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
        }
    }
};

export default SongController;
