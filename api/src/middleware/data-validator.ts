import { Request, Response, NextFunction } from "express";
import z from "zod";
import { loginSchema, signUpSchema } from "../types/user";

function dataValidate (
    // type: z.AnyZodObject,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const data = req.body;

    const route = req.path;

    let type = z.object({});

    switch (route) {
        case "/signup":
            type = signUpSchema;
            break;
        case "/login":
            type = loginSchema;
            break;
    }

    const result = type.safeParse(data);

    if(result.error){
        return res.status(400).send({
            message: "Json sent can't be parsed"
        });
    }

    if(!result.success) {
        return res.status(400).send({
            message: "Json sent doesn't fit validation requirements"
        });
    }
    
    next()
};

export default dataValidate;