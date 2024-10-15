import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    tags: {
        type: Array,
    }
})

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
