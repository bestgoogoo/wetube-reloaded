import express from "express";
import { trending } from "../controllers/videoController";
import { login, logout, join } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/logout", logout);

export default globalRouter;
