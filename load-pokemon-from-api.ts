import * as request from "request";
import createOrUpdatePokemon from "./src/service/pokemons-import.service";

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
        process.stdout.write(
          "could not fetch data from api for " +
            nameOrId +
            " / code: " +
            response.statusCode
        );
        process.exit(0);
      }
      const pokemon = await createOrUpdatePokemon(body);
      process.stdout.write("pokemon saved: " + pokemon.name);
    }
  );
}
