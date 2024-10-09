import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        maxlength: 20,
        required: [true, 'please provide playlist name']
    },
    playlist_art: {
        type: String,
    },
    is_public: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Playlist = mongoose.model('Playlist', PlaylistSchema);
export default Playlist;
