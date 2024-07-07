import { passport } from '../middleware';
import { Router, Request, Response, NextFunction } from "express";
import L from '../helper/logger';
import { User } from '../model/User';
import { generateToken, generateRefreshToken } from '../utility/jwtHelper';
import { customJwtPayload } from '../model/customJwtPayload';
import { TOKEN_AGE_IN_MS, USER_AUTH_KEYS } from '../config';
import { REFRESH_TOKEN_EXPIRY, ACCESS_TOKEN_EXPIRY } from '../config';
import { CONSTANTS } from '../config';

const googleAuthRouter: Router = Router();

googleAuthRouter.get('/api/auth/google', (req: Request, res: Response, next: NextFunction) => {
    const returnTo = req.query.returnTo || '/home';
    const state = JSON.stringify({ returnTo });
    passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next);
});

googleAuthRouter.get('/api/auth/callback/google', passport.authenticate('google', { failureRedirect: '/api/auth/login-failure' }), (req: Request, res: Response) => {

    const state = JSON.parse(req.query.state as string);
    const returnTo = state.returnTo || 'http://localhost:3000/home';

    const user: User = req.user as User;
    const payload: customJwtPayload = {
        username: user.username
    }

    const token = generateToken(payload, USER_AUTH_KEYS!, ACCESS_TOKEN_EXPIRY);
    const refreshToken = generateRefreshToken(
        payload,
        USER_AUTH_KEYS!,
        REFRESH_TOKEN_EXPIRY
    );

    res.cookie(CONSTANTS.TOKEN, token, { httpOnly: true, secure: process.env.NODE_ENV === CONSTANTS.PRODUCTION_ENV, maxAge: TOKEN_AGE_IN_MS, sameSite: true });
    res.cookie(CONSTANTS.REFRESH_TOKEN, refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === CONSTANTS.PRODUCTION_ENV, maxAge: TOKEN_AGE_IN_MS, sameSite: true });
    res.cookie(CONSTANTS.USERNAME, user.username, { httpOnly: false, secure: process.env.NODE_ENV === CONSTANTS.PRODUCTION_ENV, maxAge: TOKEN_AGE_IN_MS, sameSite: true });
    res.cookie(CONSTANTS.DISPLAY_NAME, user.name!, { httpOnly: false, secure: process.env.NODE_ENV === CONSTANTS.PRODUCTION_ENV, maxAge: TOKEN_AGE_IN_MS, sameSite: true });

    res.redirect(returnTo);
});

googleAuthRouter.get('/api/auth/me', (req: Request, res: Response) => {
    res.json(req.user || {});
});

googleAuthRouter.get('/api/auth/login-failure', (req: Request, res: Response) => {
    res.status(401).send('Login failed. Unauthorized');
});

export default googleAuthRouter;
