import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { createOrUpdatePokemon } from "./src/service/pokemons.service";

const prisma = new PrismaClient();

let jsonData = fs.readFileSync("./data/pokemons.json");
let pokemonsFromFile = JSON.parse(String(jsonData));

let pokemons = [];
pokemonsFromFile.forEach((pokemonFromFile: any) => {
  pokemons.push(createOrUpdatePokemon(pokemonFromFile));
});

process.stdout.write(`${pokemons.length} pokemons saved`);
