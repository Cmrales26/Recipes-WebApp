import express from "express";
import login from "./routes/login.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(`/api`, login);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

export default app;
