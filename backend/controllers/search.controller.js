import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import Keyword from '../models/Keyword.js';

const SearchController = {
    async suggestion(req, res) {
        const { query = null } = req.query;
        if (!query) {
            throw new CustomError.BadRequest('query must be specified');
        }

        // TODO: make it more complex using regex
        const pattern = new RegExp(`${query}`, 'i');

        const suggestions = await Keyword.find({key: {$regex: pattern}}, { title : 1 }).limit(10).sort({ key: 1 });

        if (!suggestions) {
            return res.status(StatusCodes.NO_CONTENT).json({ success: true });
        }

        return res.status(StatusCodes.OK).json({ success: true, suggestions: suggestions });
    },

    async search(req, res) {
        const { query = null } = req.query;
        if (!query) {
            throw new CustomError.BadRequest('query must be specified');
        }
        // TODO: note completed
    },
};

export default SearchController;
