import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 15,
        minlength: 1,
    },
    song: {
        type: String,
        required: [true, 'Song must have song file name']
    },
    duration: {
        type: mongoose.Decimal128,
        required: [true, 'please provide song duration'],   
    },
    song_art: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    album_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Album',
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    contributors: {
        type: Array,
        maxlength: 5,
    },
    genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre',
        required: [true, 'please provide song genre']
    },
    stream_url: {
        type: String,
        required: [true, 'Song must have streaming url'],
    },
}, { timestamps: true });

const Song = mongoose.model('Song', SongSchema);
export default Song;
