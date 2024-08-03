import express, { Request, Response, Express } from 'express';

import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { GOOGLE_AUTH_CLIENTID, GOOGLE_AUTH_SECRET } from '../config';
import { User } from '../model/User';
import { userService } from '../service';
import { BadRequestError } from '../error/BadRequestError';
import { InternalServerError } from '../error/InternalServerError';
import { ResponseTypes } from '../config/ResponseTypes';

if (GOOGLE_AUTH_CLIENTID && GOOGLE_AUTH_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_AUTH_CLIENTID!,
                clientSecret: GOOGLE_AUTH_SECRET!,
                callbackURL: '/api/auth/callback/google',
                passReqToCallback: true,
            },
            async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {

                const user: User = {
                    username: profile.emails ? profile.emails[0].value : profile.id,
                    name: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : 'NA',
                    profilePhoto: profile.photos ? profile.photos[0].value : 'NA'
                }

                try {
                    await userService.save(user);
                } catch (err) {
                    if (!(err instanceof BadRequestError)) {
                        return done(new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code));
                    }
                }

                return done(null, user);
            }
        )
    );
} else {
    console.warn('Google OAuth client ID or secret is not defined. Google authentication will not be available.');
}


passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});

export default passport;
