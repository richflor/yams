import { Router } from "express";
import { signIn, getUsers, login } from "../controllers/user";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/signin", signIn);
userRoutes.get("/login", login);

export default userRoutes;