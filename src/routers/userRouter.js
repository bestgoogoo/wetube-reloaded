import express from "express";
import { see, edit, remove } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id(\\d+)", see);
userRouter.get("/:id(\\d+)/edit", edit);
userRouter.get("/:id(\\d+)/remove", remove);

export default userRouter;
