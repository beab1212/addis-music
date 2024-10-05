import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    artist_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist',
        required: true,
    },
}, { timestamps: true });

const Follow = mongoose.model('Follow', FollowSchema);
export default Follow;
