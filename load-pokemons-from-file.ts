import * as fs from "fs";
import createOrUpdatePokemon from "./src/service/pokemons-import.service";
import { PokemonFromApi } from "./src/types/pokemon-from-api";

const jsonData = fs.readFileSync("./data/pokemons.json");
const pokemonsFromFile = JSON.parse(String(jsonData));

const pokemons = [];
pokemonsFromFile.forEach((pokemonFromFile: PokemonFromApi) => {
  pokemons.push(createOrUpdatePokemon(pokemonFromFile));
});

process.stdout.write(`${pokemons.length} pokemons saved`);
