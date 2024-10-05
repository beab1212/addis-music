import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 15,
        minlength: 1,
    },
    duration: {
        type: mongoose.Decimal128,
        required: [true, 'please provide song duration'],   
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
    genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre',
        default: null,
    },
    stream_url: {
        type: String,
        required: [true, 'Song must have streaming url']
    },
}, { timestamps: true });

const Song = mongoose.model('Song', SongSchema);
export default Song;
