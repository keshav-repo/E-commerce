import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
    constructor(message: string, errorCode: string) {
        super(401, message, errorCode);
    }
}
