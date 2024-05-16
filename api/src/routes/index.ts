import { Router } from "express";
import { signIn, getUsers, login } from "../controllers/user";
import { playGame } from "../controllers/game";
import { verifyToken } from "../middleware/auth-JWT";
import { getPastries } from "../controllers/pastries";

const userRoutes: Router = Router();

// userRoutes.get("/users", getUsers);

userRoutes.post("/signup", signIn);
userRoutes.get("/login", login);

userRoutes.post("/play", verifyToken, playGame);

userRoutes.get("/pastries", getPastries);

export default userRoutes;