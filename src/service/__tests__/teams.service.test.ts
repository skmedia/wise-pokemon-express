import { createTeam } from "./../teams.service";
import { prismaMock } from "./../../prisma-mock.client";

test("should create new team ", async () => {
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
