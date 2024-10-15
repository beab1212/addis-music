import { StatusCodes } from 'http-status-codes';
import { isValidObjectId, Types } from 'mongoose';
import path from 'path';
import config from '../config.js';
import CustomError from '../errors/index.js';
import { getAudioDuration, isHlsAudioExist, generateHLSStream } from '../utils/song.utils.js';
import { moveToDataPath } from '../utils/file.utils.js';
import Song from '../models/Song.js';
import AlbumSong from '../models/AlbumSong.js';
import Genre from '../models/Genre.js';
import Album from '../models/Album.js';
import Like from '../models/Like.js';
import Keyword from '../models/Keyword.js';
import ListeningHistory from '../models/ListeningHistory.js';
import PlaylistSong from '../models/PlaylistSong.js';
import Activity from '../models/Activity.js';


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

        
        const songPath = await moveToDataPath(req.files.song[0]?.path, 'song');
        const songArtPath = await moveToDataPath(req.files.song_art[0]?.path, 'image');

        if (!songPath || !songArtPath) {
            throw new CustomError.BadRequest('something is wrong please try again later');
        }

        const newSong = new Song({
            title,
            description,
            contributors: contributorsList,
            genre: isGenreExist._id,
            song: req.files?.song[0].filename,
            duration: await getAudioDuration(songPath),
            song_art: req.files?.song_art ? req.files?.song_art[0].filename : null,
            user_id: user._id
        });

        newSong.stream_url = `${config.HOST_ADDRESS}/api/v1/song/stream/${newSong._id}/`;

        if (album) {
            if (!isValidObjectId(album)) {
                throw new CustomError.BadRequest('invalid genre id');
            }
            const isAlbumExists = await Album.findById(album);

            if (!isAlbumExists) {
                throw new CustomError.BadRequest('selected album does\'t exist');
            }

            if (isAlbumExists.user_id.toString() !== user._id) {
                return res.status(StatusCodes.FORBIDDEN).json({ success: false, error: 'you don\'t have permission to this album' })
            }

            const newAlbumSong = new AlbumSong({
                album_id: album,
                song_id: newSong._id
            });

            await newAlbumSong.save();

            newSong.album_id = album;
        }

        await newSong.save();

        const keyword = new Keyword({
            key: `${title}, ${contributors}, ${description}`,
            title: `${title}`,
        });

        await keyword.save();
        
        const newSongJson = newSong.toObject();
        delete newSongJson.song;
        delete newSongJson.__v;

        return res.status(StatusCodes.CREATED).json({ success: true, message: 'Song created successfully', song: { ...newSongJson, duration: parseFloat(newSong.duration) } });
    },

    async song(req, res) {
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
        
        if (!songs) {
            return res.status(StatusCodes.OK).join({ success: true, songs: [] })
        }

        return res.status(StatusCodes.OK).json({ success: true, songs });
    },

    async songDetail(req, res) {
        const user = req.user;
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
        transformedSong.song_art = `${config.HOST_ADDRESS}/api/v1/song/asset/${transformedSong.song_art}`;
        // not import when app is once deployed
        transformedSong.stream_url = `${config.HOST_ADDRESS}/api/v1/song/stream/${transformedSong._id}/`;
        delete transformedSong.__v;

        const like = await Like.findOne({ user_id: new Types.ObjectId(user._id), song_id: song._id });

        if (like) {
            transformedSong.liked = true;
        } else {
            transformedSong.liked = false;
        }

        return res.status(StatusCodes.OK).json({ success: true, song: { ...transformedSong } });
    },

    async songStream(req, res) {
        // /song/stream/:id/:fileName
        // TODO: implement ads future here
        const user = req.user;
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
                const song = await Song.findById(id);
        
                if (!song) {
                    return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'requested song doesn\'t exist' })
                }
                console.log('=================================== Requested song hls not exist, Generating new hls segment...',);
                await generateHLSStream(song._id, song.song);
            }
            // when user listen up to 130 seconds song marked as listened
            if (fileName === 'output12.ts') {
                makeSongListened(id, user._id);
            }
            res.status(StatusCodes.OK).sendFile(segmentPath);
        } catch(err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
        }
    },

    async likeSong(req, res) {
        // song/:id/like
        const user = req.user;
        const { id='' } = req.params;

        if (!isValidObjectId(id))  {
            throw new CustomError.BadRequest('invalid song id');
        }

        const song = await Song.findById(id);

        if (!song) {
            throw new CustomError.BadRequest('song doesn\'t exist');
        }        

        const like = await Like.findOne({ song_id: new Types.ObjectId(id), user_id:  new Types.ObjectId(user._id) });

        if (like) {
            await Like.findOneAndDelete({ song_id: new Types.ObjectId(id), user_id:  new Types.ObjectId(user._id) });
            return res.status(StatusCodes.OK).json({ success: true, like: false });
        }

        const newLike = new Like({
            song_id: id,
            user_id: user._id
        });

        await newLike.save()

        return res.status(StatusCodes.OK).json({ success: true, like: true })
    },

    async favoriteSong(req, res) {
        const user = req.user;
        let { page=1, per_page=20 } = req.query;

        const favSongs = await Like.find({ user_id: new Types.ObjectId(user._id) }, { song_id: 1 }).skip(per_page *(page - 1)).limit(per_page);

        return res.status(StatusCodes.OK).json({ success: true, favSongs })
    },

    async userSong(req, res) {
        const user = req.user;
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
        const patternStart = new RegExp(`^${query}`, 'i');

        const songs = await Song.aggregate([
            { $match:
                {$and: [
                    { user_id: new Types.ObjectId(user._id) },
                    { $or: [
                        { title: {$regex: pattern}},
                        { description: {$regex: pattern}},
                        { contributors: {$regex: patternStart}},
                    ]}
                ] }
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

        return res.status(StatusCodes.OK).json({ success: true, songs });
    },

    async deleteSong(req, res) {
        const user = req.user;
        const { id='' } = req.params;

        if (!isValidObjectId(id))  {
            throw new CustomError.BadRequest('invalid song id');
        }

        const song = await Song.findById(id);

        if (!song) {
            throw new CustomError.BadRequest('requested song doesn\'t exist');
        }

        if (song.user_id.toString() !== user._id) {
            return res.status(StatusCodes.FORBIDDEN).json({ success: false, error: 'you don\'t have permission to this song' })
        }

        await Album.deleteOne({ _id: new Types.ObjectId(id)})

        await AlbumSong.deleteOne({ song_id: new Types.ObjectId(id) });

        await PlaylistSong.deleteMany({ song_id: new Types.ObjectId(id) });

        res.status(StatusCodes.OK).json({ success: true, message: 'album deleted successfully' });
    },

    async updateSong(req, res) {
        const user = req.user;
        const { id='' } = req.params;
        const { title, genre, contributors, description } = req.body;

        if (!isValidObjectId(id)) {
            throw new CustomError.BadRequest('invalid song id');
        }

        if (!isValidObjectId(genre)) {
            throw new CustomError.BadRequest('invalid genre id');
        }

        const song = await Song.findById(id);

        if (!song) {
            throw new CustomError.BadRequest('requested song doesn\'t exist');
        }

        if (song.user_id.toString() !== user._id) {
            return res.status(StatusCodes.FORBIDDEN).json({ success: false, error: 'you don\'t have permission to this song' })
        }

        if (song.title === title && song.description === description && song.genre.toString() === genre && song.contributors === contributors?.split(',')) {
            throw new CustomError.BadRequest('nothing is new to update with');
        }

        const newGenre = await Genre.findById(genre);

        if (!newGenre) {
            throw new CustomError.BadRequest('selected genre does\'t exist');
        }
        
        await Song.updateOne({ _id: song._id }, { title, description, contributors: contributors?.split(', '), genre });

        res.status(StatusCodes.OK).json({ success: true, message: 'song updated successfully' });
    }
};


const makeSongListened = async(song_id, user_id) => {
    const isListened = await ListeningHistory.findOne({ user_id: new Types.ObjectId(user_id), song_id: new Types.ObjectId(song_id) });

    // current user already listen the song
    if (isListened) {
        console.log('=========> Debugging==== user already listened the song');
        return null
    }

    const newListen = new ListeningHistory({
        user_id,
        song_id
    })
    console.log('=========> Debugging==== song: ', song_id, ' got new listener id: ', user_id);
    
    createActivity(song_id, user_id);

    await newListen.save();

    return newListen;
}

const createActivity = async (song_id, user_id) => {

    const song = await Song.findById(song_id);

    // tags formatted for regex
    await new Activity({
        user_id: user_id,
        tags: song.contributors
    }).save()
}

export default SongController;
