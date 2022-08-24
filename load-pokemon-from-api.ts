import * as fs from "fs";
import * as request from "request";
import { Pokemon, PrismaClient } from "@prisma/client";
import { exit } from "process";
import { createOrUpdatePokemon } from "./src/service/pokemons.service";

const prisma = new PrismaClient();
const args = process.argv.slice(2);

if (args.length !== 1) {
  process.stdout.write("please provide a name or id");
  process.exit(0);
}

const nameOrId = args[0];
fetchPokemonFromApi(nameOrId);

function fetchPokemonFromApi(nameOrId: string | number) {
  return request.get(
    {
      url: "https://pokeapi.co/api/v2/pokemon/" + nameOrId,
      json: true,
    },
    async function (error, response, body) {
      if (!response || response.statusCode !== 200) {
        process.stdout.write("pokemon not fround: " + nameOrId);
        process.exit(0);
      }
      const pokemon = await createOrUpdatePokemon(body);
      process.stdout.write("pokemon saved: " + pokemon.name);
    }
  );
}
