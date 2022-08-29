import express, { Express } from "express";
import dotenv from "dotenv";
import https from "https";
import * as fs from "fs";
import * as teamsRoutes from "./src/routes/teams.routes";
import * as pokemonsRoutes from "./src/routes/pokemons.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/", [teamsRoutes.default, pokemonsRoutes.default]);

const privateKey = fs.readFileSync("./keys/localhost+2-key.pem");
const certificate = fs.readFileSync("./keys/localhost+2.pem");

https
  .createServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app
  )
  .listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
