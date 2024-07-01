import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
    constructor(message: string, errorCode: string) {
        super(400, message, errorCode);
    }
}
