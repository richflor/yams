import { Response, Request, NextFunction } from "express";
import { IUser } from "../types/user";
import User from "../models/user";
import { play } from "../lib/game";

const playGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as Pick<IUser, "email">;

        const user = await User.findOne({ "email": body.email });

        if (user) {
            const attempts = user.numberAttempts;

            if (attempts >= 3) {
                return res.status(403).send({
                    message: "Player has no attempts left",
                });
            }

            const numberPastriesWon = play();

            user.numberAttempts--;

            user.pastries.length += numberPastriesWon;

            await user.save();

            return res.status(200).json({
                "attempts left": 3 - user.numberAttempts,
                "pastries won": user.pastries.length
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

