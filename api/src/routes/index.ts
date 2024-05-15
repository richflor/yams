import { Router } from "express";
import { signIn, getUsers, login } from "../controllers/user";
import { playGame } from "../controllers/game";
import { verifyToken } from "../middleware/auth-JWT";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers);

userRoutes.post("/signin", signIn);
userRoutes.get("/login", login);

userRoutes.post("/play", verifyToken, playGame)

export default userRoutes;