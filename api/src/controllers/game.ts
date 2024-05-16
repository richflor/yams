import { Response, Request, NextFunction } from "express";
import { IUser } from "../types/user";
import User from "../models/user";
import { play } from "../lib/game";

export const playGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const user = await User.findOne({ "email": body.user.email });
        console.log(body.user.email)
        console.log(user)

        if (user) {
            const attempts = user.numberAttempts;

            if (attempts >= 3) {
                return res.status(403).send({
                    message: "Player has no attempts left",
                });
            }

            const numberPastriesWon = play();
            console.log(numberPastriesWon);

            user.numberAttempts++;

            user.numberPastriesToRetrieve += numberPastriesWon

            await user.save();

            return res.status(200).json({
                "attempts left": 3 - user.numberAttempts,
                "pastries won": user.numberPastriesToRetrieve
            })

        } else {
            return res.status(404).send({
                message: "User doesn't exist",
            });
        }
    } catch (error) {
        next(error)
    }
}

