import {
  findPokemonById,
  findAll,
  findAllv2,
  search,
} from "../pokemons.service";
import prisma from "../../prisma.client";

describe("pokemons service - db tests", () => {
  beforeAll(async () => {
    await prisma.pokemon.createMany({
      data: [
        {
          id: 1,
          name: "Pokemon 1",
          details: {
            weight: 55,
          },
          types: [{ type: { name: "water" }, slot: 1 }],
          sprites: {
            front_default: "url default",
            front_shiny: "url shiny",
          },
        },
        {
          id: 2,
          name: "Pokemon 2",
          types: [{ type: { name: "normal" }, slot: 2 }],
          sprites: {
            front_default: "url default",
            front_shiny: "url shiny",
          },
        },
      ],
    });
  });

  afterAll(async () => {
    prisma.pokemon.deleteMany();
  });

  test("should find a pokemon by id", async () => {
    await expect(findPokemonById(1)).resolves.toEqual({
      id: 1,
      name: "Pokemon 1",
      weight: 55,
    });
  });

  test("should find all pokemons", async () => {
    await expect(findAll({ field: "name", dir: "asc" })).resolves.toEqual([
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "water" }, slot: 1 }],
        sprites: {
          front_default: "url default",
        },
      },
      {
        id: 2,
        name: "Pokemon 2",
        types: [{ type: { name: "normal" }, slot: 2 }],
        sprites: {
          front_default: "url default",
        },
      },
    ]);
  });

  test("should find all pokemons - v2 - page 1", async () => {
    await expect(
      findAllv2({ field: "name", dir: "asc" }, 0, 1)
    ).resolves.toEqual({
      count: 2,
      data: [
        {
          id: 1,
          name: "Pokemon 1",
          sprites: {
            front_default: "url default",
          },
          types: [{ type: { name: "water" }, slot: 1 }],
        },
      ],
    });
  });

  test("should find all pokemons - v2 - page 2", async () => {
    await expect(
      findAllv2({ field: "name", dir: "asc" }, 1, 1)
    ).resolves.toEqual({
      count: 2,
      data: [
        {
          id: 2,
          name: "Pokemon 2",
          types: [{ type: { name: "normal" }, slot: 2 }],
          sprites: {
            front_default: "url default",
          },
        },
      ],
    });
  });

  test("should search pokemons", async () => {
    await expect(search("water", 1)).resolves.toEqual([
      {
        id: 1,
        name: "Pokemon 1",
        types: [{ type: { name: "water" }, slot: 1 }],
        sprites: {
          front_default: "url default",
        },
      },
    ]);
  });
});
