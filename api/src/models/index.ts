import { url } from "../config/db.config";
import mongoose from "mongoose";
import user from "./user";
import pastries from "./pastries";

mongoose.Promise = global.Promise;

export const db = {
    mongoose:mongoose,
    url: url,
    user: user,
    pastries: pastries
};
