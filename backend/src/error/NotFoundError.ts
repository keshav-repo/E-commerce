import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
    constructor(message: string, errorCode: string) {
        super(404, message, errorCode);
    }
}