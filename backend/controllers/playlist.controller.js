import { StatusCodes } from 'http-status-codes';
import { isValidObjectId, Types } from 'mongoose';
import CustomError from '../errors/index.js';
import Playlist from '../models/Playlist.js';
import PlaylistSong from '../models/PlaylistSong.js';

const PlaylistController = {
    async addPlaylist(req, res) {
        const user = req.user;
        const { name, is_public=false } = req.body;
        const { playlist_art } = req.files;

        if (!name) {
            throw new CustomError.BadRequest('please provide new playlist name');
        }

        if (name.length < 3 || name.length > 30) {
            throw new CustomError.BadRequest('playlist name length must be between 3 and 30');
        }

        const newPlaylist = new Playlist({
            name: name,
            user_id: user._id,
            is_public: is_public === 'true' ? true : false,
        });

        if (playlist_art) {
            newPlaylist.playlist_art = playlist_art[0].filename;
        }

        await newPlaylist.save();

        const newPlaylistJson = newPlaylist.toObject();
        delete newPlaylistJson.__v;
        
        return res.status(StatusCodes.CREATED).json({ success: true, message: 'playlist created successfully add song to it', playlist: { ...newPlaylistJson } });

    },

    async playlist(req, res) {
        const user = req.user;        
        const { query='' } = req.query;
        let { page=1, per_page=20 } = req.query;

        try {
            page = parseInt(page);
            per_page = parseInt(per_page);
        } catch(parseErr) {
            throw new CustomError.BadRequest('page and per_page must be type integer');
        }

        const pattern = new RegExp(`${query}`, 'i');

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
                stream_url: 1,
                is_public: 1,
                createdAt: 1,
                updatedAt: 1,
                playlist_art: { $concat: ['http://localhost:5000/api/v1/playlist/asset/', '$playlist_art']},
            }},
            { $skip: per_page *(page - 1)},
            { $limit: per_page }
        ]);

        return res.status(StatusCodes.OK).json({ success: true, playlists });
    },

    async playlistDetail(req, res) {
        const user = req.user;
        const { id='' } = req.params;

        if (!isValidObjectId(id))  {
            throw new CustomError.BadRequest('invalid song id');
        }

        const playlist = await Playlist.findById(id, { __v: 0 });

        if (!playlist) {
            throw new CustomError.BadRequest('playlist does\'t exist');
        }

        if (!playlist.is_public && playlist.user_id.toString() !== user._id ) {
            return res.status(StatusCodes.FORBIDDEN).json({ success: false, error: 'you don\'t have permission' });
        }
        const playlistJson = playlist._doc;
        const songs = await PlaylistSong.find({ playlist_id: playlist._id }, { song_id: 1, _id: 0 });

        if (playlistJson?.playlist_art) {
            playlistJson.playlist_art = `http://localhost:5000/api/v1/playlist/asset/${playlistJson.playlist_art}`;
        } else {
            if (songs) {
                playlistJson.playlist_art = `http://localhost:5000/api/v1/playlist/asset/${songs[0]?.song_art}`;
            }
        }

        return res.status(StatusCodes.OK).json({ success: true, playlist: { ...playlistJson , songs: songs }});
    }
};

export default PlaylistController;

