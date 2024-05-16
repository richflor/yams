import { Request, Response, NextFunction } from "express";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    if (err.code && err.code === 11000) {
        return res.status(400).json({message:"Email or name already for another account"})
    }
    res.status(500).json({message:"Server Internal Error"})
};

export default errorHandler;
