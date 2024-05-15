import { IUser } from "../types/user";
import { model, Schema } from "mongoose";
import { pastriesSchema } from "./pastries";

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        numberAttempts: {
            type: Number,
            default: 0
        },
        numberPastriesToRetrieve: {
            type: Number,
            default: 0
        },
        pastries: {
            type: [pastriesSchema],
            default: []
        }
    }
)

export default model<IUser>("User", userSchema)