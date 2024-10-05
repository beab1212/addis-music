import mongoose from 'mongoose';

const AlbumSchema  = new mongoose.Schema({
    artist_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist',
        required: true
    },
    genre_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre',
        default: null,
    },
    title: {
        type: String,
        minlength: 1,
    }
}, { timestamps: true });

export default Album = mongoose.model('Album', AlbumSchema);
