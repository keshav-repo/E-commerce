import jwt from "jsonwebtoken";
import { customJwtPayload } from "../model/customJwtPayload";
import { TokenExpiredError } from "../error/TokenExpiredError";
import { InvalidTokenError } from "../error/InvalidTokenError";
import { BaseError } from "../error/BaseError";
import { ResponseTypes } from "../config/ResponseTypes";
import { InternalServerError } from "../error/InternalServerError";

export function generateToken(
    payload: customJwtPayload,
    secretKey: string,
    expiresIn: string
): string {
    const token = jwt.sign(payload, secretKey, {
        expiresIn: expiresIn,
    });
    return token;
}

export function generateRefreshToken(
    payload: customJwtPayload,
    secretKey: string,
    expiresIn: string
): string {
    const refreshToken = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
    return refreshToken;
}

// export function verifyToken(
//     token: string,
//     secretKey: string
// ): customJwtPayload {
//     const payload = jwt.verify(token, secretKey) as customJwtPayload;
//     return payload;
// }


export function verifyToken(
    token: string,
    secretKey: string
): customJwtPayload {
    try {
        const payload = jwt.verify(token, secretKey) as customJwtPayload;
        return payload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenExpiredError();
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new InvalidTokenError();
        } else {
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
}