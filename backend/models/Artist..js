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

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;
