import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: [true, 'please provide genre name'],
    },
    image: {
        type: Array,
        required: [true, 'required for ui presentation']
    },
    description: {
        type: String,
        maxlength: 1000,
    },
}, { timestamps: true });

const Genre = mongoose.model('Genre', GenreSchema);
export default Genre;
