import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {    
    const error = {
        message: 'Internal server error',
        status: err.status || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if (err?.name === 'customError') {
        error.message = err.message
    } else if(err?.code === 'LIMIT_UNEXPECTED_FILE') {
        error.status = StatusCodes.BAD_REQUEST;
        error.message = `Unexpected file field "${err.field}"`;
    } else {
        // Critical local system error
        console.error(err);
    }
    return res.status(error.status).json({ success: false, error: error.message });
}

export default errorHandler
