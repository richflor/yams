import { Router } from "express";
import { addUser, getUsers } from "../controllers/user";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/user", addUser);

export default userRoutes;