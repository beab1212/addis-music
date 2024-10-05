import mongoose from 'mongoose';

const PlaylistSongSchema = new mongoose.Schema({
    playlist_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Playlist',
        required: true,
    },
    song_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Song',
        required: true,
    },
}, { timestamps: true });

const PlaylistSong = mongoose.model('PlaylistSong', PlaylistSongSchema);
export default PlaylistSong;
