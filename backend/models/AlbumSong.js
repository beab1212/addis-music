import mongoose from 'mongoose';

const AlbumSongSchema = new mongoose.Schema({
    song_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Song',
        required: true,
    },
    album_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Album',
        required: true,
    },
}, { timestamps: true });

const AlbumSong = mongoose.model('AlbumSong', AlbumSongSchema);
export default AlbumSong;
