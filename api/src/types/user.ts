import { Document } from "mongoose";
import { IPastries } from "./pastries";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    numberAttempts: number;
    pastries: IPastries[];
}