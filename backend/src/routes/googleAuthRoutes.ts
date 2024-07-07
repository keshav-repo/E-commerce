import { passport } from '../middleware';
import { Router, Request, Response } from "express";
import L from '../helper/logger';
import { User } from '../model/User';
import { generateToken, generateRefreshToken } from '../utility/jwtHelper';
import { customJwtPayload } from '../model/customJwtPayload';
import { USER_AUTH_KEYS } from '../config';

const googleAuthRouter: Router = Router();

// Google Sign-In redirect route
googleAuthRouter.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Sign-In callback route (handles redirect after user authorization)
googleAuthRouter.get('/api/auth/callback/google', passport.authenticate('google', { failureRedirect: '/api/auth/login-failure' }), (req: Request, res: Response) => {

    const user: User = req.user as User;
    const payload: customJwtPayload = {
        username: user.username
    }

    const token = generateToken(payload, USER_AUTH_KEYS, '1h');
    const refreshToken = generateRefreshToken(
        payload,
        USER_AUTH_KEYS,
        "7d"
    );

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('username', user.username, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
    res.cookie('displayname', user.name!, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });

    res.redirect('http://localhost:3000/home');
});

googleAuthRouter.get('/api/auth/me', (req: Request, res: Response) => {
    res.json(req.user || {});
});

googleAuthRouter.get('/api/auth/login-failure', (req: Request, res: Response) => {
    res.status(401).send('Login failed. Unauthorized');
});


export default googleAuthRouter;
