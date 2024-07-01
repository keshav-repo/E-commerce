import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
    constructor(message: string, errorCode: string) {
        super(500, message, errorCode);
    }
}