import { BaseError } from './BaseError';

export class StripeError extends BaseError {
    constructor(message: string, errorCode: string) {
        super(500, message, errorCode);
    }
}