import { User } from "../model/User";

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
