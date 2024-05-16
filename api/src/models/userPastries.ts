import { IUserPastries } from "../types/userPastries";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
    {
        id_user: {
            type: String,
            required: true,
            unique: true
        },
        id_pastries: {
            type: Number,
            required: true,
            unique: true,
        },
        quantity: {
            type: String,
            required: true,
        },
    }
)

export default model<IUserPastries>("User", userSchema)