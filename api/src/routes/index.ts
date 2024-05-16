import { Router } from "express";
import { signIn, getUsers, login } from "../controllers/user";
import { playGame } from "../controllers/game";
import { verifyToken } from "../middleware/auth-JWT";
import { getPastries } from "../controllers/pastries";
import dataValidate from "../middleware/data-validator";
import { signUpSchema } from "../types/user";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers); // route pour faire des tests

userRoutes.post("/signup", dataValidate, signIn);
userRoutes.get("/login", dataValidate, login);

userRoutes.post("/play", verifyToken, playGame);

userRoutes.get("/pastries", getPastries);

export default userRoutes;