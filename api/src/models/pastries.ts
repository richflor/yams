import { IPastries } from "../types/pastries";
import { model, Schema } from "mongoose";

const pastriesSchema: Schema = new Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        stock: {
            type: Number,
        },
        quantityWon: {
            type: Number,
        }
    }
)

export default model<IPastries>("Pastries", pastriesSchema);