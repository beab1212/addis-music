import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
    artistName: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 200,
    },
}, { timestamps: true });

export default Artist = mongoose.model('Artist', ArtistSchema);
