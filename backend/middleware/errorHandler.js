import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

const errorHandler = (err, req, res, next) => {    
    const error = {
        message: err.message || 'Internal server error',
        status: err.status || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err?.name === 'customError') {
        res
    } else if(err?.code === 'LIMIT_UNEXPECTED_FILE') {
        error.status = StatusCodes.BAD_REQUEST;
        error.message = `Unexpected file field "${err.field}"`;
    } else {
        // Critical local system error
        console.log(err);
    }
    return res.status(error.status).json({ success: false, error: error.message });
}

export default errorHandler
