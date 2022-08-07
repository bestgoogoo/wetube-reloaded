import { request } from "express";
import express from "../node_modules/express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.send("<h1>Home</h1>");
};

app.get("/", handleHome);

const handleListening = () =>
  console.log(`✅ Sever Listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
