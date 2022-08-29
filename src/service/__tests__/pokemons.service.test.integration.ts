import { findPokemonById } from "../pokemons.service";
import prisma from "../../prisma.client";

beforeAll(async () => {
  await prisma.pokemon.createMany({
    data: [
      {
        id: 1,
        name: "Pokemon 1",
      },
      {
        id: 2,
        name: "Pokemon 2",
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
  });
});
