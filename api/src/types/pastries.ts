import { Document } from "mongoose";

export interface IPastries extends Document {
    _id: string;
    name: string;
    image: string;
    stock: number;
    quantityWon: number;
}