import express from "express";
import multer from "multer";
import fs from "fs";
import morgan, { format } from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
