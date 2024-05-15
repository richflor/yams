import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../types/user"

dotenv.config();

const secret = process.env.JWT_ACCESS_SECRET || 'ggeg'

export const generateToken = (user:Pick <IUser, "name" | "email">) => {
    try {
        const {email , name} = user;
        const token = jwt.sign({
            email, 
            name
        }, secret, { expiresIn:60});
        return token;
    } catch (error) {
        throw error
    }
}