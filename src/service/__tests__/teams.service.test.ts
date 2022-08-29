import {
  createTeam,
  findTeamById,
  assignPokemonsToTeam,
} from "./../teams.service";
import { prismaMock } from "./../../prisma-mock.client";

describe("teams service", () => {
  test("should create new team", async () => {
    const team = {
      id: 1,
      name: "Team 1",
      createdAt: new Date("2022-08-27T19:50:37.706Z"),
      updatedAt: new Date("2022-08-27T19:50:37.706Z"),
    };

    prismaMock.team.create.mockResolvedValue(team);

    await expect(createTeam(team)).resolves.toEqual({
      id: 1,
      name: "Team 1",
      createdAt: new Date("2022-08-27T19:50:37.706Z"),
      updatedAt: new Date("2022-08-27T19:50:37.706Z"),
    });
  });

  test("should find a team by id", async () => {
    const team = {
      id: 1,
      name: "Team 1",
      createdAt: new Date("2022-08-27T19:50:37.706Z"),
      updatedAt: new Date("2022-08-27T19:50:37.706Z"),
      pokemons: [
        {
          teamId: 1,
          pokemonId: 1,
        },
      ],
    };

    prismaMock.team.findUniqueOrThrow.mockResolvedValue(team);

    await expect(findTeamById(team.id)).resolves.toEqual({
      id: 1,
      name: "Team 1",
      pokemons: [1],
    });
  });

  test("should assign pokemons to a team", async () => {
    const existingTeam = {
      id: 1,
      name: "Team 1",
      createdAt: new Date("2022-08-27T19:50:37.706Z"),
      updatedAt: new Date("2022-08-27T19:50:37.706Z"),
      pokemons: [
        {
          teamId: 1,
          pokemonId: 4,
        },
      ],
    };

    const updatedTeam = {
      id: 1,
      name: "Team 1",
      createdAt: new Date("2022-08-27T19:50:37.706Z"),
      updatedAt: new Date("2022-08-27T19:50:37.706Z"),
      pokemons: [
        {
          teamId: 1,
          pokemonId: 1,
        },
        {
          teamId: 1,
          pokemonId: 2,
        },
        {
          teamId: 1,
          pokemonId: 3,
        },
      ],
    };

    prismaMock.team.findFirstOrThrow.mockResolvedValue(existingTeam);
    prismaMock.team.update.mockResolvedValue(updatedTeam);
    prismaMock.team.findUniqueOrThrow.mockResolvedValue(updatedTeam);

    await expect(assignPokemonsToTeam(1, [1, 2, 3])).resolves.toEqual({
      id: 1,
      name: "Team 1",
      pokemons: [1, 2, 3],
    });
  });
});
