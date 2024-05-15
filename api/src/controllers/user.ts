import { Response, Request, NextFunction } from "express";
import { IUser } from "../types/user";
import User from "../models/user";
import { generateToken } from "../lib/generateToken";
import * as bcrypt from "bcrypt"

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: IUser[] = await User.find();
        return res.status(200).json({ users })
    } catch (error) {
        next(error)
    }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as Pick<IUser, "name" | "email" | "password">;

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(body.password, salt)

        const user: IUser = new User({
            name: body.name,
            email: body.email,
            password: hashPassword
        })

        const newUser: IUser = await user.save();

        return res.status(201).json(newUser)
    } catch (error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as Pick<IUser, "email" | "name" | "password">;

        const user = await User.findOne({ "email": body.email });
        if (!user) {
            return res.status(404).send({
                message: "User doesn't exist",
            });
        } else {
            const passwordIsValid = await bcrypt.compare(body.password, user.password)

            if (passwordIsValid) {
                const token = generateToken(body as Pick<IUser, "email" | "name">);
                return res.status(200).json({"user":user, "token":token})
            } else {
                return res.status(401).send({
                    message: "Wrong password",
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

export { getUsers, signIn, login }