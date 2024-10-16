import mongoose from 'mongoose';

const KeywordSchema = new mongoose.Schema({
    key: {
        type: String,
        maxlength: 500,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

const Keyword = mongoose.model('Keyword', KeywordSchema);
export default Keyword;
