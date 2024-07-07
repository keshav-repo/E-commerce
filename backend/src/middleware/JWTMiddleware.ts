import { Request, Response, NextFunction } from "express";
import { generateToken, verifyToken } from "../utility/jwtHelper";
import { customJwtPayload } from "../model/customJwtPayload";
import { USER_AUTH_KEYS } from "../config";
import { TokenExpiredError } from "../error/TokenExpiredError";

class JWTMiddleware {

    constructor() {
    }

    public authenticateJWT = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        const token = req.cookies.token;
        const refreshToken = req.cookies.refreshToken;

        if (token) {
            try {
                const payload: customJwtPayload = verifyToken(token, USER_AUTH_KEYS!);
                (req as any).user = {
                    username: payload.username,
                };
                next();
            } catch (error) {
                if (error instanceof TokenExpiredError && refreshToken) {
                    try {
                        const refreshPayload: customJwtPayload = verifyToken(refreshToken, USER_AUTH_KEYS!);
                        const newToken = generateToken({ username: refreshPayload.username }, USER_AUTH_KEYS!, "1h");

                        res.cookie('token', newToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict'
                        });

                        (req as any).user = { username: refreshPayload.username };
                        next();
                    } catch (refreshError) {
                        res.sendStatus(403);
                    }
                } else {
                    res.sendStatus(403);
                }
            }
        } else {
            res.sendStatus(401);
        }
    };
}

export default JWTMiddleware;
