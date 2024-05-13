import { Document } from "mongoose";

export interface IPastries extends Document {
    name: string;
    image: string;
    stock: number;
    quantityWon: number;
}