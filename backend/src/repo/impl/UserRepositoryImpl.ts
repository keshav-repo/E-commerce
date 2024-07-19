import { UserRepository } from "../UserRepository";
import { User } from "../../model/User";
import { db } from "../../db";
import L from "../../helper/logger";

class UserRepositoryImpl implements UserRepository {

    constructor() {
    }

    async findByUsername(username: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE username = $1";

        try {
            const result = await db.execute(query, [username]);

            if (result.rows.length > 0) {
                const user: User = {
                    userId: String(result.rows[0].userid),
                    username: result.rows[0].username,
                    password: result.rows[0].password,
                    email: result.rows[0].email
                };
                return user;
            } else {
                return null;
            }
        } catch (err) {
            L.error("Error finding user by username:", err);
            throw err;
        }
    }

    async save(user: User): Promise<void> {
        const query = `
            INSERT INTO users (username, password, email, name, profilePhoto)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, password, email, name, profilePhoto
        `;
        const params = [
            user.username,
            user.password,
            user.email || null, // Ensure optional fields are handled
            user.name || null,
            user.profilePhoto || null
        ];
        try {
            await await db.execute(query, params);
            L.info("User saved successfully");
        } catch (error) {
            L.error("Error saving user:", error);
            throw error;
        }
    }
}

export default UserRepositoryImpl;
