import express from "express";
import {
  see,
  getEdit,
  postEdit,
  remove,
  startGithubLogin,
  finishGithubLogin,
  logout,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.route("/:id([0-9a-f]{24})/remove").get(remove);

export default userRouter;
