import { Response, Request } from "express";
import { IUser } from "../../types/user";
import User from "../../models/user";

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res.status(200).json({users})
    } catch (error) {
        throw error
    }
}

const addUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const body = req.body as Pick <IUser, "name" | "email">
        const user: IUser = new User({
            name: body.name,
            email: body.email,
        })

        const newUser: IUser = await user.save();

        res.status(201).json(newUser)
    } catch (error) {
        throw error;
    }
}

export {getUsers, addUser}