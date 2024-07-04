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
            res.json(new SuccessResponse(ResponseTypes.TOKEN_CREATED, tokenRes));
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

}

export default UserController;
