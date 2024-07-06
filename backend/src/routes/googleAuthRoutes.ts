import { passport } from '../middleware';
import { Router, Request, Response } from "express";
import L from '../helper/logger';

const googleAuthRouter: Router = Router();

// Google Sign-In redirect route
googleAuthRouter.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Sign-In callback route (handles redirect after user authorization)
googleAuthRouter.get('/api/auth/callback/google', passport.authenticate('google', { failureRedirect: '/api/auth/login-failure' }), (req: Request, res: Response) => {
    // Redirect or respond with user data after successful authentication
    L.info('callback after successful login');


    res.redirect('http://localhost:3000');
});

googleAuthRouter.get('/api/auth/me', (req: Request, res: Response) => {
    res.json(req.user || {});
});

googleAuthRouter.get('/api/auth/login-failure', (req: Request, res: Response) => {
    res.status(401).send('Login failed. Unauthorized');
});


export default googleAuthRouter;
