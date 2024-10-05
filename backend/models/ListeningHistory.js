import mongoose from 'mongoose';

const ListeningHistorySchema = new mongoose.Schema({
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

export default ListeningHistory = mongoose.model('ListeningHistory', ListeningHistorySchema);
