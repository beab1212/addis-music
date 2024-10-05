import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: [true, 'please provide genre name'],
    },
    description: {
        type: String,
        maxlength: 1000,
    },
}, { timestamps: true });

export default Genre = mongoose.model('Genre', GenreSchema);
