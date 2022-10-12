import express from "express";
import {
  see,
  remove,
  getEdit,
  postEdit,
  startGithubLogin,
  finishGithubLogin,
  logout,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id(\\d+)", see);
userRouter.route("/:id([0-9a-f]{24})/remove").get(remove);

export default userRouter;
