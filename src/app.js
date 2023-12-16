import express from "express";
import cookieParser from "cookie-parser";
import login from "./routes/login.routes.js";
import categories from "./routes/categories.routes.js";
import recipes from "./routes/recipes.routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(`/api`, login);
app.use("/api", categories);
app.use("/api", recipes);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

export default app;
