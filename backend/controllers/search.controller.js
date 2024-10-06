import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/index.js';
import Keyword from '../models/Keyword.js';

const SearchController = {
    async suggestion(req, res) {
        const { query = null } = req.query;
        if (!query) {
            throw new CustomError.BadRequest('query must be specified')
        }
    }
}

export default SearchController;
