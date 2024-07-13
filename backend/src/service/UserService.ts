import { User } from "../model/User";
import { TokenResponse } from "../response/TokenResponse";

export interface UserService {
    save(user: User): Promise<void>;
    findByUsername(username: string, password: string): Promise<TokenResponse>;
    findUser(username: string): Promise<User>;
}