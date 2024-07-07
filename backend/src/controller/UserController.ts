import { NextFunction, Request, Response } from "express";
import { ResponseTypes } from "../config/ResponseTypes";
import { User } from "../model/User";
import { SuccessResponse } from "../response/SuccessResponse";
import { TokenResponse } from "../response/TokenResponse";
import { UserService } from "../service/UserService";
import { getHash } from "../utility/encryption";

class UserController {
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const password = req.body.password;
        const username = req.body.username;

        // TODO: sanity check for username and password

        try {
            const tokenRes: TokenResponse = await this.userService.findByUsername(username, password);

            res.cookie('token', tokenRes.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000, sameSite: true });
            res.cookie('refreshToken', tokenRes.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000, sameSite: true });
            res.cookie('username', username, { httpOnly: false, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000, sameSite: true });
            res.cookie('displayname', username, { httpOnly: false, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000, sameSite: true });

            res.json(new SuccessResponse(ResponseTypes.TOKEN_CREATED));
        } catch (err) {
            next(err);
        }
    };

    public addUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // TODO: sanity check
        const user: User = {
            username: req.body.username,
            password: await getHash(req.body.password, 10),
        };
        try {
            await this.userService.save(user);
            res.status(201).json(new SuccessResponse(ResponseTypes.USER_CREATED));
        } catch (err) {
            next(err);
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.clearCookie('username', { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
        res.clearCookie('displayname', { httpOnly: false, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json(new SuccessResponse(ResponseTypes.LOGOUT_SUCCESS));
    }

}

export default UserController;
