import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../models/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "SecretKEt";

export const register = async (email, password, name) => {
    try {
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userCheck.rows.length > 0) {
            throw new Error("Email is user already registered!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        return newUser.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export const login = async (email, password) => {
    try {
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userCheck.rows.length === 0) {
            throw new Error("No user found with this email!");
        }
        const user = userCheck.rows[0];


        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Incorrect password!");
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

        return { token, user: { id: user.id, name: user.name, email: user.email } };
    } catch (error) {
        throw new Error(error.message);
    }
}
