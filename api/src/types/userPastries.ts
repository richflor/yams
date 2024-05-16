import { Document } from "mongoose";

export interface IUserPastries extends Document {
    _id: string;
    id_User: string;
    id_Pastries: string;
    quantity: number;
    numberPastriesToRetrieve: number;
}