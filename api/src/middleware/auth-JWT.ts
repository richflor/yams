import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_ACCESS_SECRET || ""

interface AccessToken {
    name:string;
    email:string;
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
                console.log(err.message);
                let message = "";
                if(err instanceof jwt.JsonWebTokenError) {
                    switch (err.name) {
                        case "TokenExpiredError":
                            message = "Token has expired"
                            break;
                        case "JsonWebTokenError":
                            message = "Access token could not be decoded"
                            break;
                        case "NotBeforeError":
                            message = "'jwt not active"
                        default:
                            message = "Access token could not be decoded"
                            break;
                    }
                }
                return res.status(401).send({
                    message: message,
                });
            }
            if (!decoded) {
                return res.status(401).send({
                    message: "Access token could not be decoded",
                });
            }

            const accessToken = decoded as AccessToken;
          
            if (!accessToken.email) {
                return res.status(401).send({
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