import { StatusCodes } from 'http-status-codes';
import CustomError from './customError.js';

export default class BadRequest extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}
