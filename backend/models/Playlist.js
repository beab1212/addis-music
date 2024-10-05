import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        maxlength: 15,
        required: [true, 'please provide playlist name']
    }
}, { timestamps: true })

export default Playlist = mongoose.model('Playlist', PlaylistSchema);
