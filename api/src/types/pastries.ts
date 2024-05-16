import { Document } from "mongoose";

export interface IPastries extends Document {
    _id: number;
    name: string;
    image: string;
    stock: number;
    quantityWon: number;
}

export interface IPastriesAsked {
    name:string;
    quantity: number
}