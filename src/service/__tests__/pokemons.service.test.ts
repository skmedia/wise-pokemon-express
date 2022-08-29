import {
  findPokemonById,
  findAll,
  findAllv2,
  search,
} from "../pokemons.service";
import { Pokemon } from "@prisma/client";
import { prismaMock } from "../../prisma-mock.client";

describe("pokemons service", () => {
  test("should find a pokemon by id", async () => {
    const pokemon = {
      id: 1,
      name: "Pokemon 1",
      types: [],
      sprites: [],
      details: {
        weight: 54,
      },
      createdAt: new Date("2022-08-27T19:50:37.706Z"),
      updatedAt: new Date("2022-08-27T19:50:37.706Z"),
    };

    prismaMock.pokemon.findUnique.mockResolvedValue(pokemon);

    await expect(findPokemonById(pokemon.id)).resolves.toEqual({
      id: 1,
      name: "Pokemon 1",
      weight: 54,
    });
  });

  test("list pokemons", async () => {
    const pokemonsFoundInDb: Pokemon[] = [
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "type" }, slot: "slot" }],
        sprites: { front_default: "front_default" },
        details: {
          weight: 54,
        },
        createdAt: new Date("2022-08-27T19:50:37.706Z"),
        updatedAt: new Date("2022-08-27T19:50:37.706Z"),
      },
    ];

    const pokemonsReturned = [
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "type" }, slot: "slot" }],
        sprites: { front_default: "front_default" },
      },
    ];

    prismaMock.pokemon.findMany.mockResolvedValue(pokemonsFoundInDb);

    await expect(findAll({ field: "name", dir: "asc" })).resolves.toEqual(
      pokemonsReturned
    );
  });

  test("list pokemons - v2", async () => {
    const pokemonsFoundInDb: Pokemon[] = [
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "type" }, slot: "slot" }],
        sprites: { front_default: "front_default" },
        details: {
          weight: 54,
        },
        createdAt: new Date("2022-08-27T19:50:37.706Z"),
        updatedAt: new Date("2022-08-27T19:50:37.706Z"),
      },
    ];

    const pokemonsReturned = [
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "type" }, slot: "slot" }],
        sprites: { front_default: "front_default" },
      },
    ];

    prismaMock.pokemon.count.mockResolvedValue(pokemonsFoundInDb.length);
    prismaMock.pokemon.findMany.mockResolvedValue(pokemonsFoundInDb);

    await expect(
      findAllv2({ field: "name", dir: "asc" }, 0, 10)
    ).resolves.toEqual({ count: 1, data: pokemonsReturned });
  });

  test("search pokemons", async () => {
    const pokemonsFoundInDb: Pokemon[] = [
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "type" }, slot: "slot" }],
        sprites: { front_default: "front_default" },
        details: {
          weight: 54,
        },
        createdAt: new Date("2022-08-27T19:50:37.706Z"),
        updatedAt: new Date("2022-08-27T19:50:37.706Z"),
      },
    ];

    const pokemonsReturned = [
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "type" }, slot: "slot" }],
        sprites: { front_default: "front_default" },
      },
    ];

    prismaMock.pokemon.findMany.mockResolvedValue(pokemonsFoundInDb);

    await expect(search("water", 10)).resolves.toEqual(pokemonsReturned);
  });
});
