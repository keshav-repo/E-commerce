import { USER_AUTH_KEYS } from "../../config";
import { ResponseTypes } from "../../config/ResponseTypes";
import { BadRequestError } from "../../error/BadRequestError";
import { InternalServerError } from "../../error/InternalServerError";
import { NotFoundError } from "../../error/NotFoundError";
import { UnauthorizedError } from "../../error/UnauthorizedError";
import L from "../../helper/logger";
import { User } from "../../model/User";
import { customJwtPayload } from "../../model/customJwtPayload";
import { UserRepository } from "../../repo/UserRepository";
import { TokenResponse } from "../../response/TokenResponse";
import { compareHash } from "../../utility/encryption";
import { generateRefreshToken, generateToken } from "../../utility/jwtHelper";
import { UserService } from "../UserService";
import { REFRESH_TOKEN_EXPIRY, ACCESS_TOKEN_EXPIRY } from "../../config";
import { use } from "passport";

class UserServiceImpl implements UserService {
    private userRepo: UserRepository;
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }
    async save(user: User): Promise<void> {
        try {
            const user2 = await this.userRepo.findByUsername(user.username);
            if (user2 != null) {
                throw new BadRequestError(ResponseTypes.USER_EXIST.message, ResponseTypes.USER_EXIST.code);
            }
        } catch (err) {
            L.error("error in checking if user exist", err);
            if (err instanceof BadRequestError)
                throw err;

            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
        try {
            this.userRepo.save(user);
        } catch (err) {
            L.error("error in saving user", err);
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
    async findByUsername(username: string, password: string): Promise<TokenResponse> {
        try {
            const user: User | null = await this.userRepo.findByUsername(username);
            if (!user) {
                throw new NotFoundError(ResponseTypes.USER_NOT_FOUND.message, ResponseTypes.USER_NOT_FOUND.code);
            }

            const match = await compareHash(password, user.password!);
            if (match) {
                const payload: customJwtPayload = {
                    username: user.username,
                };
                const token = generateToken(payload, USER_AUTH_KEYS!, ACCESS_TOKEN_EXPIRY);
                const refreshToken = generateRefreshToken(
                    payload,
                    USER_AUTH_KEYS!,
                    REFRESH_TOKEN_EXPIRY
                );
                const tokenMessage: TokenResponse = { token, refreshToken }
                return tokenMessage;
            } else {
                throw new UnauthorizedError(ResponseTypes.USER_WRONG_CRED.message, ResponseTypes.USER_WRONG_CRED.code);
            }
        } catch (err) {
            L.error('error in findByUsername ', err);
            if (err instanceof NotFoundError || err instanceof UnauthorizedError)
                throw err;
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
    async findUser(username: string): Promise<User> {
        try {
            const user: User | null = await this.userRepo.findByUsername(username);
            if (!user) {
                throw new NotFoundError(ResponseTypes.USER_NOT_FOUND.message, ResponseTypes.USER_NOT_FOUND.code);
            }
            return user;
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof UnauthorizedError)
                throw err;
            throw new InternalServerError(ResponseTypes.INTERNAL_ERROR.message, ResponseTypes.INTERNAL_ERROR.code);
        }
    }
}

export default UserServiceImpl;