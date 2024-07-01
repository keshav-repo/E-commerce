import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../error/BaseError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        res.status(err.statusCode).json({ errorCode: err.errorCode, message: err.message });
    } else {
        res.status(500).json({ errorCode: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' });
    }
};
