import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    song_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Song',
        required: true,
    },
}, { timestamps: true });

const Like = mongoose.model('Like', LikeSchema);
export default Like;
