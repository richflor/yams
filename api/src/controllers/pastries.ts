import { Response, Request, NextFunction } from "express";
import Pastries from "../models/pastries";
import { IPastries } from "../types/pastries";
import { IPastriesAsked } from "../types/pastries";

const getPastries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pastries: IPastries[] = await Pastries.aggregate([
            {
              $project: {
                name: 1,
                image: 1,
                numberLeft: { $subtract: ["$stock", "$quantityWon"] }
              }
            }
          ]);
        return res.status(200).json({ pastries })
    } catch (error) {
        next(error)
    }
}

const chose = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const choice = req.body as IPastriesAsked;

        const pastries = Pastries.findOne({"name": choice.name})

        // const available = pastries.stock - pastries.QuantityWon
        
        //check if available

        //remove from stock

        //add to user
    } catch (error) {
        next(error)
    }
}

export {getPastries, chose}