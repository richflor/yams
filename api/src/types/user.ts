import { Document } from "mongoose";
import z from "zod";

export const userSchema = z.object({
    _id: z.string(),
    name: z.string().min(4).max(20),
    email:z.string().email(),
    password:z.string().min(8).max(20),
    numberAttempts:z.number(),
    numberPastriesToRetrieve:z.number(),
    pastries:z.map(z.string(),z.number())
})

export const signUpSchema = userSchema.pick({
    name:true,
    email:true,
    password:true,
})

export const loginSchema = signUpSchema.omit({name:true})

export type LoginInfo = z.infer<typeof loginSchema>

export type SignUpInfo = z.infer<typeof userSchema>

export type IUser = z.infer<typeof userSchema>