import { ResponseTypes } from '../config/ResponseTypes';
import { BaseError } from './BaseError';

export class TokenExpiredError extends BaseError {
    constructor() {
        super(404, ResponseTypes.TOKEN_EXPIRED.message, ResponseTypes.TOKEN_EXPIRED.code);
    }
}

