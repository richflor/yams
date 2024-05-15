const config = require("../config/auth.config.js");
const db = require("../models");
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_ACCESS_SECRET || ""

interface AccessToken {
    id:string;
}

export const verifyToken = ( req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['x-access-token'] as string;

        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }
    
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            if (!decoded) {
                res.status(401).send({
                    message: "Access token could not be decoded",
                });
            }

            const accessToken = decoded as AccessToken;
          
            if (!accessToken.id) {
                res.status(401).send({
                    message: "userId was not found in the payload",
                });
            }
          
            next();
        });
    } catch (error) {
        next(error)
    }
};

// const authJwt = {
//   verifyToken: verifyToken,
// };