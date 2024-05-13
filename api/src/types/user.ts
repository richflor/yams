import { Document } from "mongoose";
import { IPastries } from "./pastries";

export interface IUser extends Document {
    name: string;
    email: string;
    numberAttempts: number;
    pastries: IPastries[];
}
