import express from "express";
import {
  see,
  edit,
  remove,
  startGithubLogin,
  finishGithubLogin,
  logout,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);
userRouter.get("/:id(\\d+)/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.route("/:id([0-9a-f]{24})/remove").get(remove);

export default userRouter;
