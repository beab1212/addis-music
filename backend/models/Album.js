import mongoose from 'mongoose';

const AlbumSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    contributors: {
        type: Array,
        maxlength: 5,
    },
    genre_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre',
        default: null,
    },
    album_art: {
        type:String
    },
    title: {
        type: String,
        minlength: 1,
    }
}, { timestamps: true });

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
