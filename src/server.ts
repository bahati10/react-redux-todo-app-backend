import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

db.authenticate()
  .then((res) => console.log("connected to database successfully"))
  .catch((error) => console.log(error));

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.get("/", (req, res) => {
  res.send("welcome to todo");
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
